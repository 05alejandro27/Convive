package com.convive.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

//Creo un record, es una clase de Java exclusiva para transportar datos y esta pensadas para DTOs que no llevan lógica adicional
public record ApartmentRequest(

    //Comprueba que no llegue nulo y pone un mensaje en caso de estarlo
    @NotNull(message = "La planta es obligatoria")
    Integer floor,

    //Compueba que no llegue nulo, vacio o espacios en blancos y pone un mensaje en caso de serlo
    @NotBlank(message = "La puerta es obligatoria")
    String door

) {}
