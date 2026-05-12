package com.convive.backend.mapper;

import com.convive.backend.dto.response.InvitationListResponse;
import com.convive.backend.model.entity.Invitation;
import org.springframework.stereotype.Component;

@Component
public class InvitationMapper {

    public InvitationListResponse toResponse(Invitation invitation) {
        return new InvitationListResponse(
            invitation.getApartment().getFloor(),
            invitation.getApartment().getDoor(),
            invitation.getCode(),
            invitation.getUsed(),
            invitation.getCreatedDate(),
            invitation.getExpiresDate()
        );
    }
}
