package com.convive.backend.exception;

//Se lanza cuando no se encuentra un recurso en la base de datos (votación, presupuesto, usuario...)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
