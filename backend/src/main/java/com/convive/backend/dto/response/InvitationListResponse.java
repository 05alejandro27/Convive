package com.convive.backend.dto.response;

import java.time.LocalDateTime;

public record InvitationListResponse(

        Integer floor,
        String door,
        String code,
        Boolean used,
        LocalDateTime createdDate,
        LocalDateTime expiresDate

) {}
