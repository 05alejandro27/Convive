package com.convive.backend.repository;

import com.convive.backend.model.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    //Devuelve todos los pisos de una comunidad
    @Query("SELECT a FROM Apartment a WHERE a.community.id = :communityId")
    List<Apartment> findByCommunityId(@Param("communityId") Long communityId);

    //Busca un piso por id asegurándose de que pertenece a la comunidad
    @Query("SELECT a FROM Apartment a WHERE a.id = :id AND a.community.id = :communityId")
    Optional<Apartment> findByIdAndCommunityId(@Param("id") Long id, @Param("communityId") Long communityId);

    //Comprueba si ya existe un piso con esa planta y puerta en la comunidad (para evita duplicados)
    @Query("SELECT COUNT(a) > 0 FROM Apartment a WHERE a.community.id = :communityId AND a.floor = :floor AND a.door = :door")
    boolean existsByCommunityIdAndFloorAndDoor(@Param("communityId") Long communityId, @Param("floor") Integer floor, @Param("door") String door);

    //Cuenta el total de pisos de una comunidad (para las estadísticas)
    @Query("SELECT COUNT(a) FROM Apartment a WHERE a.community.id = :communityId")
    long countByCommunityId(@Param("communityId") Long communityId);

    //Cuenta los pisos inactivos de una comunidad (para las estadísticas)
    @Query("SELECT COUNT(a) FROM Apartment a WHERE a.community.id = :communityId AND a.active = false")
    long countInactiveByCommunityId(@Param("communityId") Long communityId);

}