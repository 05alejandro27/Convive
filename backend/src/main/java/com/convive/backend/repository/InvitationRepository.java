package com.convive.backend.repository;

import com.convive.backend.model.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    //Listar invitaciones activas de una comunidad
    @Query("SELECT i FROM Invitation i WHERE i.apartment.community.id = :communityId AND i.used = false AND i.expiresDate >= current_timestamp")
    List<Invitation> findActiveByCommunityId(@Param("communityId") Long communityId);

    //Encontrar el código, no esta usado, no esta caducado y pertenece a la comunidad del usuario
    @Query("SELECT i FROM Invitation i WHERE i.code = :code AND i.used = false AND i.expiresDate >= current_timestamp AND i.apartment.community.id = :communityId")
    Optional<Invitation> findValidByCodeAndCommunityId(@Param("code") String code, @Param("communityId") Long communityId);

    //Verificar que existe el código, no esta usado, no esta caducado y pertenece a la comunidad del usuario
    @Query("SELECT COUNT(i)>0 FROM Invitation i WHERE i.code = :code AND i.used = false AND i.expiresDate >= current_timestamp AND i.apartment.community.id = :communityId")
    boolean existsValidByCodeAndCommunityId(@Param("code") String code, @Param("communityId") Long communityId);

    //Verificar si ya existe una invitación activa para un piso
    @Query("SELECT COUNT(i) > 0 FROM Invitation i WHERE i.apartment.id = :apartmentId AND i.used = false AND i.expiresDate >= current_timestamp")
    boolean existsActiveByApartmentId(@Param("apartmentId") Long apartmentId);
}
