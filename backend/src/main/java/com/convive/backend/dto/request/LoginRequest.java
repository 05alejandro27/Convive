package com.convive.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//Creo un record, es una clase de Java exclusiva para transportar datos y esta pensadas para DTOs que no llevan lógica adicional
public record LoginRequest(

    //Comprueba que no llegue nulo y pone un mensaje en caso de estarlo
    @NotNull(message = "La planta es obligatoria")
    Integer floor,

    //Compueba que no llegue nulo, vacio o espacios en blancos y pone un mensaje en caso de serlo
    @NotBlank(message = "La puerta es obligatoria")
    String door,

    //Compueba que no llegue nulo, vacio o espacios en blancos y pone un mensaje en caso de serlo
    @NotBlank(message = "El parámetro contraseña es obligatorio")
    //Compueba que el tamaño sea mínimo de 8 carácteres y pone un mensaje en caso de serlo
    @Size(min = 8, message = "La contraseña debe tener mínimo 8 carácteres")
    String password

) {}

