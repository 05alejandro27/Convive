package com.convive.backend.repository;

import com.convive.backend.model.entity.UserApartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserApartmentRepository extends JpaRepository<UserApartment, Long> {

}