package com.convive.backend.exception;

//Se lanza cuando el login falla (piso o contraseña incorrectos)
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
