package com.convive.backend.controller;

import com.convive.backend.dto.request.LoginRequest;
import com.convive.backend.dto.request.RegisterRequest;
import com.convive.backend.dto.response.LoginResponse;
import com.convive.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//Genera un constructor con todos los atributos final
@RequiredArgsConstructor
//DEfino la ruta base para todos los ENDPOINTS del controlador
@RequestMapping("/api/auth")
public class AuthController {

    //Declaro el servicio de autenticación
    private final AuthService authService;

    //Este metodo responde a esta ruta, siendo "communityId" variable
    @PostMapping("/login/{communityId}")
    //Creo un metodo que devuelve un ResponseEntity que envuelve un LoginResponse. Recibe dos variables, la primera es el communityId que extrae de la URL
    //y la otra es la respuesta validando que el formato sea correcto
    public ResponseEntity<LoginResponse> login (@PathVariable Long communityId, @Valid @RequestBody LoginRequest request) {

        //Llamo al metodo login pasandole los atributos y se encargara de llevar a cabo toda la lógica
        LoginResponse response = authService.login(communityId, request);

        //Devuelve la respuesta HTTP, la esperada es un 200 y también devuelve el objeto LoginResponse
        return ResponseEntity.ok(response);

    }

    @PostMapping("/register/{communityId}")
    public ResponseEntity<Void> register (@PathVariable Long communityId, @Valid @RequestBody RegisterRequest request) {

        //Llamo al metodo register pasandole los atributos y se encargara de llevar a cabo toda la lógica
        authService.register(communityId, request);

        //Devuelve la respuesta HTTP, la esperada es un 201 (REcurso creado)
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
