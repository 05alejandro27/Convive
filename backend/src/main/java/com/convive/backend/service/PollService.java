package com.convive.backend.service;

import com.convive.backend.dto.request.PollRequest;
import com.convive.backend.dto.response.PollResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.PollMapper;
import com.convive.backend.model.entity.Community;
import com.convive.backend.model.entity.Poll;
import com.convive.backend.model.entity.User;
import com.convive.backend.model.enums.Status;
import java.util.stream.Stream;
import com.convive.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;
    private final VoteRepository voteRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final UserApartmentRepository userApartmentRepository;
    private final PollMapper pollMapper;

    private PollResponse buildResponse(Poll poll, Long userId) {

        int totalVotes = (int) voteRepository.countByPollId(poll.getId());
        boolean userVoted = voteRepository.existsByPollIdAndUserId(poll.getId(), userId);

        return pollMapper.toResponse(poll, totalVotes, userVoted);
    }

    @Transactional
    public List<PollResponse> getAllByCommunity(Long communityId, Long userId) {

        communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Comunidad no encontrada"));

        List<Poll> polls = pollRepository.findAllByCommunityId(communityId);

        //Cierro la votación si se ha pasado la fecha límite
        for (Poll poll: polls) {
            closeIfExpired(poll);
        }

        //Ordeno abiertas por por fecha límite
        List<PollResponse> open = polls.stream()
                .filter(p -> p.getStatus() == Status.OPEN)
                .sorted(Comparator.comparing(Poll::getDeadline))
                .map(p -> buildResponse(p, userId))
                .toList();

        //Ordeno cerradas por por fecha límite
        List<PollResponse> closed = polls.stream()
                .filter(p -> p.getStatus() == Status.CLOSED)
                .sorted(Comparator.comparing(Poll::getCreatedDate).reversed())
                .map(p -> buildResponse(p, userId))
                .toList();

        //Las uno en forma de lista
        return Stream.concat(open.stream(), closed.stream()).toList();
    }

    @Transactional
    public PollResponse getById(Long communityId, Long pollId, Long userId) {

        Poll poll = pollRepository.findByIdAndCommunityId(communityId, pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Votación no encontrada"));

        closeIfExpired(poll);

        return buildResponse(poll, userId);
    }

    @Transactional
    public PollResponse create(Long communityId, PollRequest request, Long creatorId) {

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Comunidad no encontrada"));

        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (request.deadline().isBefore(LocalDateTime.now())) {
            throw new BusinessRuleException("La fecha límite debe ser mayor a la fecha actual");
        }

        Poll poll = new Poll();
        poll.setCommunity(community);
        poll.setTitle(request.title());
        poll.setDescription(request.description());
        poll.setCreator(creator);
        poll.setStatus(Status.OPEN);
        poll.setDeadline(request.deadline());
        poll.setCreatedDate(LocalDateTime.now());
        poll.setUpdatedDate(LocalDateTime.now());

        Poll saved = pollRepository.save(poll);

        return buildResponse(saved, creatorId);
    }

    //Cierre automático por fecha límite
    private void closeIfExpired(Poll poll) {

        if (poll.getStatus() == Status.OPEN && poll.getDeadline().isBefore(LocalDateTime.now())) {
            poll.setStatus(Status.CLOSED);
            poll.setUpdatedDate(LocalDateTime.now());
            pollRepository.save(poll);
            log.info("Votación {} cerrada automáticamente", poll.getId());
        }
    }

    //Cierre automático por participación completa
    @Transactional
    public void closeIfAllVoted(Poll poll, Long communityId) {

        long totalUsers = userApartmentRepository.countByCommunityId(communityId);
        long totalVotes = voteRepository.countByPollId(poll.getId());

        if (totalVotes >= totalUsers) {
            poll.setStatus(Status.CLOSED);
            poll.setUpdatedDate(LocalDateTime.now());
            pollRepository.save(poll);
            log.info("Votación {} cerrada automáticamente", poll.getId());
        }
    }
}
