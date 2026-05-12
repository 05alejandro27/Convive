package com.convive.backend.mapper;

import com.convive.backend.dto.response.ExpenseResponse;
import com.convive.backend.model.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpensesMapper {

    public ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getName(),
                expense.getDescription(),
                expense.getExpenseType(),
                expense.getCost(),
                expense.getMonth(),
                expense.getCreatedDate()
        );
    }
}