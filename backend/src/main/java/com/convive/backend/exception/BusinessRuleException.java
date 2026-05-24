package com.convive.backend.exception;

//Se lanza cuando se viola una regla de negocio (votar dos veces, deshabilitar al presidente...)
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
