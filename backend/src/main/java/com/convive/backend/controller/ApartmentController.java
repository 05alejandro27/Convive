package com.convive.backend.controller;

import com.convive.backend.dto.request.ApartmentRequest;
import com.convive.backend.dto.response.ApartmentResponse;
import com.convive.backend.dto.response.ApartmentStatsResponse;
import com.convive.backend.service.ApartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Genera un constructor con todos los atributos final
@RequiredArgsConstructor
//DEfino la ruta base para todos los ENDPOINTS del controlador
@RequestMapping("/api/apartments")
public class ApartmentController {

    //Declaro el servicio de pisos
    private final ApartmentService apartmentService;

    //GET
    //Consigue todos los pisos de una comunidad concreta
    @GetMapping("/{communityId}")
    public ResponseEntity<List<ApartmentResponse>> findAll(@PathVariable Long communityId) {
        return ResponseEntity.ok(apartmentService.findAllByCommunityId(communityId));
    }

    //GET
    //Consigue las estadisticas de los pisos de una comunidad concreta (Total de pisos, ocupados, inactivos y vacios)
    @GetMapping("/{communityId}/stats")
    public ResponseEntity<ApartmentStatsResponse> getStats(@PathVariable Long communityId) {
        return ResponseEntity.ok(apartmentService.getStats(communityId));
    }

    //POST
    //Crea un nuevo piso
    @PostMapping("/{communityId}")
    public ResponseEntity<ApartmentResponse> create(@PathVariable Long communityId, @Valid @RequestBody ApartmentRequest request) {

        ApartmentResponse response = apartmentService.createApartment(communityId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //PUT
    //Edita los valores de un piso
    @PutMapping("/{communityId}/{id}")
    public ResponseEntity<ApartmentResponse> edit(@PathVariable Long communityId, @PathVariable Long id, @Valid @RequestBody ApartmentRequest request) {
        return ResponseEntity.ok(apartmentService.editApartment(communityId, id, request));
    }

    //PATCH
    //Alterna entre el estado activo e inactivo de un piso
    @PatchMapping("/{communityId}/{id}/toggle-active")
    public ResponseEntity<ApartmentResponse> toggleActive(@PathVariable Long communityId, @PathVariable Long id) {
        return ResponseEntity.ok(apartmentService.toggleActive(communityId, id));
    }
}