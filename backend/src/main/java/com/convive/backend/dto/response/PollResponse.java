package com.convive.backend.dto.response;

import com.convive.backend.model.enums.Status;

import java.time.LocalDateTime;

public record PollResponse(

        Long id,
        String title,
        String description,
        String creatorName,
        Status status,
        LocalDateTime deadline,
        int totalVotes,
        boolean userVoted

) {}
