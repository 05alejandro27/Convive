package com.convive.backend.mapper;

import com.convive.backend.dto.response.PollResponse;
import com.convive.backend.model.entity.Poll;
import com.convive.backend.model.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PollMapper {

    public PollResponse toResponse(Poll poll, int totalVotes, boolean userVoted) {
        User creator = poll.getCreator();
        String creatorName = creator.getFirstName() + " " + creator.getLastName1();

        return new PollResponse(
                poll.getId(),
                poll.getTitle(),
                poll.getDescription(),
                creatorName,
                poll.getStatus(),
                poll.getDeadline(),
                totalVotes,
                userVoted
        );
    }
}
