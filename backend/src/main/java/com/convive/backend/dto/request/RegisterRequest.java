package com.convive.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

    @NotBlank(message = "El código de invitación es obligatorio")
    @Size(min = 8, max = 8, message = "El código de invitación debe tener 8 carácteres")
    String code,

    @NotBlank(message = "El nombre es obligatorio")
    String firstName,

    @NotBlank(message = "El primer apellido es obligatorio")
    String lastName1,

    String lastName2,

    @NotBlank(message = "El correo es obligatorio")
    String email,

    @NotBlank(message = "El teléfono es obligatorio")
    String phone,

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener mínimo 8 carácteres")
    String password

) {}