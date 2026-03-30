package com.convive.backend.dto.response;

//Creo un record, es una clase de Java exclusiva para transportar datos y esta pensadas para DTOs que no llevan lógica adicional
//Se encarga de enviar los datos de los pisos al frontend
public record ApartmentResponse(

        Long id,
        Integer floor,
        String door,
        Boolean active,
        String status,
        String residentFullName

) {}
