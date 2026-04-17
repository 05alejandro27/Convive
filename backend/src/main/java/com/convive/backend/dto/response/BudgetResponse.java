package com.convive.backend.dto.response;

import com.convive.backend.model.enums.Status;
import java.math.BigDecimal;
import java.time.LocalDate;

public record BudgetResponse(

        Long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        BigDecimal annualAmount,
        BigDecimal emergencyFund,
        Status status

) {}