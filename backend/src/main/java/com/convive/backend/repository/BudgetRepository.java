package com.convive.backend.repository;

import com.convive.backend.model.entity.Budget;
import com.convive.backend.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    @Query("SELECT b FROM Budget b WHERE b.community.id = :communityId")
    List<Budget> findAllByCommunityId(@Param("communityId") Long communityId);

    @Query("SELECT b FROM Budget b WHERE b.community.id = :communityId AND b.id = :budgetId")
    Optional<Budget> findByCommunityIdAndBudgetId(@Param("communityId") Long communityId, @Param("budgetId") Long budgetId);

    @Query("SELECT b FROM Budget b WHERE b.community.id = :communityId AND b.status = :status")
    Optional<Budget> findByCommunityIdAndStatus(@Param("communityId") Long communityId, @Param("status") Status status);

    @Query("SELECT COUNT(b) > 0 FROM Budget b WHERE b.community.id = :communityId AND b.status = :status")
    boolean existsByCommunityIdAndStatus(@Param("communityId") Long communityId, @Param("status") Status status);

}
