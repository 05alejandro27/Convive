package com.convive.backend.repository;

import com.convive.backend.model.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ExpensesRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e FROM Expense e WHERE e.budget.id = :budgetId")
    List<Expense> findByBudgetId(@Param("budgetId") Long budgetId);

    @Query("SELECT e FROM Expense e WHERE e.budget.id = :budgetId AND e.id = :expensesId")
    Optional<Expense> findByBudgetIdAndExpenseId(@Param("budgetId") Long budgetId, @Param("expensesId") Long expensesId);

}