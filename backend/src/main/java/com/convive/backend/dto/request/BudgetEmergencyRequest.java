package com.convive.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

public record BudgetEmergencyRequest(

        @NotNull(message = "El fondo de emergencia es obligatorio")
        @PositiveOrZero(message = "El fondo de emergencia no puede ser negativo")
        BigDecimal emergencyFund

) {}
