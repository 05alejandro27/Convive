package com.convive.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String firstName,

        @NotBlank(message = "El primer apellido es obligatorio")
        String lastName1,

        String lastName2,

        @NotBlank(message = "El email es obligatorio")
        @Email(message = "El email no tiene un formato válido")
        String email,

        @NotBlank(message = "El teléfono es obligatorio")
        String phone

) {}
