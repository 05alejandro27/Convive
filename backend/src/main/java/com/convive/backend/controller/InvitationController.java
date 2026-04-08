package com.convive.backend.controller;

import com.convive.backend.dto.request.InvitationRequest;
import com.convive.backend.dto.response.InvitationListResponse;
import com.convive.backend.dto.response.InvitationResponse;
import com.convive.backend.service.InvitationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    //GET
    //Listar todos los códigos de invitación
    @GetMapping("/{communityId}")
    public ResponseEntity<List<InvitationListResponse>> findAll(@PathVariable Long communityId) {
        return ResponseEntity.ok(invitationService.findAllByCommunityId(communityId));
    }

    //POST
    //Crear un código de invitación
    @PostMapping("/{communityId}")
    public ResponseEntity<InvitationResponse> create(@PathVariable Long communityId, @Valid @RequestBody InvitationRequest request) {
        InvitationResponse response = invitationService.createCode(communityId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}