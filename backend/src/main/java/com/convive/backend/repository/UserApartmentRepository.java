package com.convive.backend.repository;

import com.convive.backend.model.entity.UserApartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserApartmentRepository extends JpaRepository<UserApartment, Long> {

    //Busca qué vecino está asignado a un piso concreto
    @Query("SELECT ua FROM UserApartment ua WHERE ua.apartment.id = :apartmentId")
    Optional<UserApartment> findByApartmentId(@Param("apartmentId") Long apartmentId);

    @Query("SELECT ua FROM UserApartment ua WHERE ua.user.id = :userId")
    Optional<UserApartment> findByUserId(@Param("userId") Long userId);

    //Cuenta pisos los ocupados, es decir, tienen un vecino asignado, el vecino está habilitado y el piso está activo
    @Query("SELECT COUNT(ua) FROM UserApartment ua WHERE ua.apartment.community.id = :communityId AND ua.user.enabled = true AND ua.apartment.active = true")
    long countOccupiedByCommunityId(@Param("communityId") Long communityId);

}