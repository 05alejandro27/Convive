package com.convive.backend.dto.response;

//Creo un record, es una clase de Java exclusiva para transportar datos y esta pensadas para DTOs que no llevan lógica adicional
//Se encarga de enviar el token al frontend
public record LoginResponse(String token) {
}
