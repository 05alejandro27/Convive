package com.convive.backend.controller;

import com.convive.backend.dto.request.UserRequest;
import com.convive.backend.dto.response.UserResponse;
import com.convive.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    //GET
    //Consigo todos los usuarios de una comunidad concreta
    @GetMapping("/{communityId}")
    public ResponseEntity<List<UserResponse>> findAll(@PathVariable Long communityId) {
        return ResponseEntity.ok(userService.findAllByCommunityId(communityId));
    }

    //PUT
    //Edita los valores de un usuario
    @PutMapping("/{communityId}/{id}")
    public ResponseEntity<UserResponse> edit(@PathVariable Long communityId, @PathVariable Long id, @Valid @RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.editUser(communityId, id, request));
    }

    //PATCH
    //Alterna entre el estado habilitado y deshabilitado de un usuario
    @PatchMapping("/{communityId}/{id}/toggle-enable")
    public ResponseEntity<UserResponse> toggleEnable(@PathVariable Long communityId, @PathVariable Long id) {
        return ResponseEntity.ok(userService.toggleEnable(communityId, id));
    }
}
