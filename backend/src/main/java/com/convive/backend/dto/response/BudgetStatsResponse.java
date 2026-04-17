package com.convive.backend.dto.response;

import java.math.BigDecimal;

public record BudgetStatsResponse(

        Long remainingDays,
        BigDecimal spent,
        BigDecimal available,
        Long spentPercentage

) {}