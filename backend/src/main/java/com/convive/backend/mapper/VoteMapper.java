package com.convive.backend.mapper;

import com.convive.backend.dto.response.VoteResponse;
import com.convive.backend.model.entity.User;
import com.convive.backend.model.entity.UserApartment;
import com.convive.backend.model.entity.Vote;
import org.springframework.stereotype.Component;

@Component
public class VoteMapper {

    public VoteResponse toResponse(Vote vote, UserApartment userApartment) {
        User voter = vote.getUser();
        String voterName = voter.getFirstName() + " " + voter.getLastName1();

        String apartment = userApartment.getApartment().getFloor() + userApartment.getApartment().getDoor();

        return new VoteResponse(
                vote.getId(),
                voterName,
                apartment,
                vote.getVoteValue()
        );
    }
}
