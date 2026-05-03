package com.convive.backend.dto.response;

import com.convive.backend.model.enums.VoteValue;

public record VoteResponse(

        Long id,
        String voterName,
        String apartment,
        VoteValue voteValue

) {}