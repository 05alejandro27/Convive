package com.convive.backend.service;

import com.convive.backend.dto.request.ApartmentRequest;
import com.convive.backend.dto.response.ApartmentResponse;
import com.convive.backend.dto.response.ApartmentStatsResponse;
import com.convive.backend.exception.DuplicateResourceException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.ApartmentMapper;
import com.convive.backend.model.entity.Apartment;
import com.convive.backend.model.entity.Community;
import com.convive.backend.repository.ApartmentRepository;
import com.convive.backend.repository.CommunityRepository;
import com.convive.backend.repository.UserApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApartmentService {

    private final ApartmentRepository apartmentRepository;
    private final CommunityRepository communityRepository;
    private final UserApartmentRepository userApartmentRepository;
    private final ApartmentMapper apartmentMapper;

    //Lógica de negocio
    private ApartmentResponse buildResponse(Apartment apartment) {

        //Buscar vecino asignado
        String residentFullName = userApartmentRepository
                .findByApartmentId(apartment.getId())
                .map(ua -> ua.getUser().getFirstName() + " " + ua.getUser().getLastName1() + " " + ua.getUser().getLastName2())
                .orElse(null);

        //Calcular estado
        String status;
        if (Boolean.FALSE.equals(apartment.getActive())) {
            status = "INACTIVE";
        } else if (residentFullName != null) {
            status = "OCCUPIED";
        } else {
            status = "EMPTY";
        }

        //Delegamos la construcción del DTO al mapper
        return apartmentMapper.toResponse(apartment, status, residentFullName);
    }

    //Listar pisos de una comunidad
    public List<ApartmentResponse> findAllByCommunityId(Long communityId) {

        List<Apartment> apartments = apartmentRepository.findByCommunityId(communityId);

        List<ApartmentResponse> responses = apartments.stream()
                .map(apartment -> this.buildResponse(apartment))
                .toList();

        return responses;
    }

    //Crear un piso
    public ApartmentResponse createApartment(Long communityId, ApartmentRequest request) {

        //Verificar que la comunidad existe
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Comunidad no encontrada"));

        //Verificar que no exista ya un piso con esa planta y puerta en la comunidad
        if (apartmentRepository.existsByCommunityIdAndFloorAndDoor(communityId, request.floor(), request.door())) {
            throw new DuplicateResourceException("Ya existe un piso en la planta " + request.floor() + " puerta " + request.door());
        }

        //Crear la entidad y guardarla
        Apartment apartment = new Apartment();
        apartment.setCommunity(community);
        apartment.setFloor(request.floor());
        apartment.setDoor(request.door());
        apartment.setActive(true);
        apartment.setCreatedDate(LocalDateTime.now());
        apartment.setUpdatedDate(LocalDateTime.now());

        Apartment apartmentCreate = apartmentRepository.save(apartment);

        return buildResponse(apartmentCreate);
    }

    //Editar un piso
    public ApartmentResponse editApartment(Long communityId, Long apartmentId, ApartmentRequest request) {

        //Buscar el piso asegurándonos de que pertenece a esa comunidad
        Apartment apartment = apartmentRepository.findByIdAndCommunityId(apartmentId, communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Piso no encontrado"));

        //Si cambió planta o puerta, verificar que no haya duplicados
        boolean floorChanged = !apartment.getFloor().equals(request.floor());
        boolean doorChanged = !apartment.getDoor().equals(request.door());

        if ((floorChanged || doorChanged) && apartmentRepository.existsByCommunityIdAndFloorAndDoor(communityId, request.floor(), request.door())) {
            throw new DuplicateResourceException("Ya existe un piso en la planta " + request.floor() + " puerta " + request.door());
        }

        //Actualiza los campos
        apartment.setFloor(request.floor());
        apartment.setDoor(request.door());
        apartment.setUpdatedDate(LocalDateTime.now());

        Apartment apartmentEdit = apartmentRepository.save(apartment);

        return buildResponse(apartmentEdit);
    }

    //Activar o desactivar un piso
    public ApartmentResponse toggleActive(Long communityId, Long apartmentId) {

        //Buscar el piso asegurándonos de que pertenece a esa comunidad
        Apartment apartment = apartmentRepository.findByIdAndCommunityId(apartmentId, communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Piso no encontrado"));

        //Invertimos el estado actual
        apartment.setActive(!apartment.getActive());
        apartment.setUpdatedDate(LocalDateTime.now());

        Apartment saved = apartmentRepository.save(apartment);

        return buildResponse(saved);
    }

    //Estadísticas
    public ApartmentStatsResponse getStats(Long communityId) {

        long total = apartmentRepository.countByCommunityId(communityId);
        long occupied = userApartmentRepository.countOccupiedByCommunityId(communityId);
        long inactive = apartmentRepository.countInactiveByCommunityId(communityId);
        long empty = total - occupied - inactive;

        return new ApartmentStatsResponse(total, occupied, empty, inactive);
    }
}