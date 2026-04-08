package com.convive.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InvitationRequest(

    //Comprueba que no llegue nulo y pone un mensaje en caso de estarlo
    @NotNull(message = "La planta es obligatoria")
    Integer floor,

    //Compueba que no llegue nulo, vacio o espacios en blancos y pone un mensaje en caso de serlo
    @NotBlank(message = "La puerta es obligatoria")
    String door

) {}
