package com.convive.backend.dto.response;

import com.convive.backend.model.enums.ExpenseType;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ExpenseResponse(

        Long id,
        String name,
        String description,
        ExpenseType expenseType,
        BigDecimal cost,
        Integer month,
        LocalDateTime createdDate

) {}
