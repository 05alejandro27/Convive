package com.convive.backend.repository;

import com.convive.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //Hace una consulta para saber el usuario que vive en una planta y puerta concreta dentro de una comunidad específica
    @Query("SELECT ua.user FROM UserApartment ua WHERE ua.apartment.community.id = :communityId AND ua.apartment.floor = :floor AND ua.apartment.door = :door")
    Optional<User> findUserByApartmentDetails(@Param("communityId") Long communityId, @Param("floor") Integer floor, @Param("door") String door);

    @Query("SELECT ua.user FROM UserApartment ua WHERE ua.apartment.community.id = :communityId")
    List<User> findByCommunityId(@Param("communityId") Long communityId);

    @Query("SELECT ua.user FROM UserApartment ua WHERE ua.apartment.community.id = :communityId AND ua.user.id = :id")
    Optional<User> findByIdAndCommunityId(@Param("communityId") Long communityId, @Param("id") Long id);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email AND u.id <> :excludeId")
    boolean existsByEmailExcludingId(@Param("email") String email, @Param("excludeId") Long excludeId);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.phone = :phone AND u.id <> :excludeId")
    boolean existsByPhoneExcludingId(@Param("phone") String phone, @Param("excludeId") Long excludeId);

}