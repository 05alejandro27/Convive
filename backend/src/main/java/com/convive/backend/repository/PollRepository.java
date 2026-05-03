package com.convive.backend.repository;

import com.convive.backend.model.entity.Poll;
import com.convive.backend.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PollRepository extends JpaRepository<Poll, Long> {

    @Query("SELECT p FROM Poll p WHERE p.community.id = :communityId")
    List<Poll> findAllByCommunityId(@Param("communityId") Long communityId);

    @Query("SELECT p FROM Poll p WHERE p.community.id = :communityId AND p.id = :id")
    Optional<Poll> findByIdAndCommunityId(@Param("communityId") Long communityId, @Param("id") Long id);

}
