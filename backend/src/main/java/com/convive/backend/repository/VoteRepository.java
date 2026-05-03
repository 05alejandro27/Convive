package com.convive.backend.repository;

import com.convive.backend.model.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT v FROM Vote v WHERE v.poll.id = :pollId")
    List<Vote> findAllByPollId(@Param("pollId") Long pollId);

    @Query("SELECT COUNT(v) FROM Vote v WHERE v.poll.id = :pollId")
    long countByPollId(@Param("pollId") Long pollId);

    @Query("SELECT COUNT(v) > 0 FROM Vote v WHERE v.poll.id = :pollId AND v.user.id = :userId")
    boolean existsByPollIdAndUserId(@Param("pollId") Long pollId, @Param("userId") Long userId);

}
