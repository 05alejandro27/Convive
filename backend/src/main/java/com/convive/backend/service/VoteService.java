package com.convive.backend.service;

import com.convive.backend.dto.request.VoteRequest;
import com.convive.backend.dto.response.VoteResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.VoteMapper;
import com.convive.backend.model.entity.Poll;
import com.convive.backend.model.entity.User;
import com.convive.backend.model.entity.UserApartment;
import com.convive.backend.model.entity.Vote;
import com.convive.backend.model.enums.Status;
import com.convive.backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final PollRepository pollRepository;
    private final UserRepository userRepository;
    private final UserApartmentRepository userApartmentRepository;
    private final VoteMapper voteMapper;
    private final PollService pollService;

    @Transactional
    public VoteResponse vote(Long communityId, Long pollId, VoteRequest request, Long userId) {

        Poll poll = pollRepository.findByIdAndCommunityId(communityId, pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Votación no encontrada"));

        if (poll.getStatus() != Status.OPEN) {
            throw new BusinessRuleException("La votación está cerrada");
        }

        if (poll.getDeadline().isBefore(LocalDateTime.now())) {
            throw new BusinessRuleException("La votación ha expirado");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        UserApartment userApartment = userApartmentRepository.findByUserIdAndCommunityId(userId, communityId)
                .orElseThrow(() -> new BusinessRuleException("No perteneces a esta comunidad"));

        if (voteRepository.existsByPollIdAndUserId(pollId, userId)) {
            throw new BusinessRuleException("Ya has votado en esta votación");
        }

        Vote vote = new Vote();
        vote.setPoll(poll);
        vote.setUser(user);
        vote.setVoteValue(request.voteValue());
        vote.setVotedDate(LocalDateTime.now());

        Vote saved = voteRepository.save(vote);

        //Se cierra la votación automáticamente si todos han votado
        pollService.closeIfAllVoted(poll, communityId);

        return voteMapper.toResponse(saved, userApartment);
    }

    public List<VoteResponse> getVotesByPoll(Long communityId, Long pollId) {

        pollRepository.findByIdAndCommunityId(communityId, pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Votación no encontrada"));

        List<Vote> votes = voteRepository.findAllByPollId(pollId);

        return votes.stream()
                .map(vote -> {
                    UserApartment ua = userApartmentRepository.findByUserId(vote.getUser().getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Piso no encontrado"));
                    return voteMapper.toResponse(vote, ua);
                })
                .toList();
    }
}
