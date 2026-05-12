package com.convive.backend.dto.request;

import com.convive.backend.model.enums.VoteValue;
import jakarta.validation.constraints.NotNull;

public record VoteRequest(

        @NotNull(message = "El valor de la votación es obligatorio")
        VoteValue voteValue

) {}