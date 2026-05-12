package com.convive.backend.dto.request;

import com.convive.backend.model.enums.ExpenseType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ExpenseRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String name,

        String description,

        @NotNull(message = "El tipo de gasto es obligatorio")
        ExpenseType expenseType,

        @NotNull(message = "El gasto es obligatorio")
        @Positive(message = "El coste debe ser mayor que 0")
        BigDecimal cost,

        @NotNull(message = "El mes es obligatorio")
        @Min(value = 1, message = "El mes debe estar entre 1 y 12")
        @Max(value = 12, message = "El mes debe estar entre 1 y 12")
        Integer month

) {}
