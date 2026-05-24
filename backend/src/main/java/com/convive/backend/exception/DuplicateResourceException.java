package com.convive.backend.exception;

//Se lanza cuando el login falla (piso o contraseña incorrectos)
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
