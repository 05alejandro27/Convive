package com.convive.backend.mapper;

import com.convive.backend.dto.response.BudgetResponse;
import com.convive.backend.model.entity.Budget;
import org.springframework.stereotype.Component;

@Component
public class BudgetMapper {

    public BudgetResponse toResponse(Budget budget) {
        return new BudgetResponse(
                budget.getId(),
                budget.getName(),
                budget.getStartDate(),
                budget.getEndDate(),
                budget.getAnnualAmount(),
                budget.getEmergencyFund(),
                budget.getStatus()
        );
    }
}
