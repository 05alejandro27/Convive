package com.convive.backend.dto.response;

//Creo un record, es una clase de Java exclusiva para transportar datos y esta pensadas para DTOs que no llevan lógica adicional
//Se encarga de enviar las estadísticas de los pisos (Cuantos hay en total, cuantos ocupados, cuantos vacios y cuántos inactivos).
public record ApartmentStatsResponse(

        Long total,
        Long occupied,
        Long empty,
        Long inactive

) {}