package com.convive.backend.service;

import com.convive.backend.dto.request.InvitationRequest;
import com.convive.backend.dto.response.InvitationListResponse;
import com.convive.backend.dto.response.InvitationResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.InvitationMapper;
import com.convive.backend.model.entity.Apartment;
import com.convive.backend.model.entity.Invitation;
import com.convive.backend.model.entity.User;
import com.convive.backend.repository.ApartmentRepository;
import com.convive.backend.repository.InvitationRepository;
import com.convive.backend.repository.UserApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final ApartmentRepository apartmentRepository;
    private final UserApartmentRepository userApartmentRepository;
    private final InvitationMapper invitationMapper;

    public List<InvitationListResponse> findAllByCommunityId(Long communityId) {

        List<Invitation> invitations = invitationRepository.findActiveByCommunityId(communityId);

        return invitations.stream()
                .map(invitationMapper::toResponse)
                .toList();
    }

    @Transactional
    public InvitationResponse createCode(Long communityId, InvitationRequest request) {

        Apartment apartment = apartmentRepository.findByCommunityIdAndFloorAndDoor(communityId, request.floor(), request.door())
                .orElseThrow(() -> new ResourceNotFoundException("El piso seleccionado no existe"));

        //Verificar que el piso esté activo
        if (Boolean.FALSE.equals(apartment.getActive())) {
            throw new BusinessRuleException("No se puede generar una invitación para un piso desactivado");
        }

        //Verificar que el piso no esté ocupado
        if (userApartmentRepository.isOccupiedByApartmentId(apartment.getId())) {
            throw new BusinessRuleException("El piso seleccionado ya tiene un vecino activo asignado");
        }

        //Verificar que no exista ya una invitación activa para ese piso
        if (invitationRepository.existsActiveByApartmentId(apartment.getId())) {
            throw new BusinessRuleException("Ya existe una invitación activa para este piso");
        }

        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom random = new SecureRandom();
        String codeInvitation;

        do{

            codeInvitation = random.ints(8, 0, allowedChars.length())
                    .mapToObj(i -> String.valueOf(allowedChars.charAt(i)))
                    .collect(Collectors.joining());

        } while (invitationRepository.existsValidByCodeAndCommunityId(codeInvitation, communityId));

        Invitation invitation = new Invitation();
        invitation.setApartment(apartment);
        invitation.setCode(codeInvitation);
        invitation.setUsed(false);
        invitation.setUser(null);
        invitation.setCreatedDate(LocalDateTime.now());
        invitation.setExpiresDate(LocalDateTime.now().plusDays(7L));

        invitationRepository.save(invitation);

        return new InvitationResponse(codeInvitation);
    }

    @Transactional
    public void use(Invitation invitation, User user) {

        invitation.setUsed(true);
        invitation.setUser(user);

        invitationRepository.save(invitation);
    }

}