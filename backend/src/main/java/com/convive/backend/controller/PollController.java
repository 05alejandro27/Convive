package com.convive.backend.controller;

import com.convive.backend.dto.request.PollRequest;
import com.convive.backend.dto.request.VoteRequest;
import com.convive.backend.dto.response.PollResponse;
import com.convive.backend.dto.response.VoteResponse;
import com.convive.backend.service.PollService;
import com.convive.backend.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;
    private final VoteService voteService;

    @GetMapping("/{communityId}")
    public ResponseEntity<List<PollResponse>> getAll(@PathVariable Long communityId, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(pollService.getAllByCommunity(communityId, userId));
    }

    @GetMapping("/{communityId}/{pollId}")
    public ResponseEntity<PollResponse> getById(@PathVariable Long communityId, @PathVariable Long pollId, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(pollService.getById(communityId, pollId, userId));
    }

    @PostMapping("/{communityId}")
    public ResponseEntity<PollResponse> create(@PathVariable Long communityId, @Valid @RequestBody PollRequest pollRequest, Authentication authentication) {
        Long creatorId = Long.valueOf(authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(pollService.create(communityId, pollRequest, creatorId));
    }

    @PostMapping("/{communityId}/{pollId}/vote")
    public ResponseEntity<VoteResponse> vote(@PathVariable Long communityId, @PathVariable Long pollId, @Valid @RequestBody VoteRequest voteRequest, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(voteService.vote(communityId, pollId, voteRequest, userId));
    }

    @GetMapping("/{communityId}/{pollId}/votes")
    public ResponseEntity<List<VoteResponse>> getVotes(@PathVariable Long communityId, @PathVariable Long pollId) {
        return ResponseEntity.ok(voteService.getVotesByPoll(communityId, pollId));
    }
}