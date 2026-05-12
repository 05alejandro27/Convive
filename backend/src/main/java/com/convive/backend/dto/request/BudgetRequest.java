package com.convive.backend.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;

public record BudgetRequest(

        String name,

        @NotNull(message = "La fecha de fin es obligatoria")
        @Future(message = "La fecha tiene que ser posterior a la fecha actual")
        LocalDate endDate,

        @NotNull(message = "La cantidad anual es obligatoria")
        @Positive(message = "La cantidad anual debe ser mayor que 0")
        BigDecimal annualAmount,

        @NotNull(message = "El fondo de emergencia es obligatorio")
        @PositiveOrZero(message = "El fondo de emergencia no puede ser negativo")
        BigDecimal emergencyFund

) {}