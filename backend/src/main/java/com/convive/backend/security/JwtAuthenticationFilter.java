package com.convive.backend.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    //Inyecto JwtService para centralizar toda la lógica de JWT en un solo sitio
    private final JwtService jwtService;

    @Override
    //Se ejecuta en cada petición HTTP que llega al backend
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //Busco la cabecera Authorization
        String authHeader = request.getHeader("Authorization");

        //Si no hay cabecera o no empieza por "Bearer " permito que pase la petición sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        //Extraigo el token quitando el prefijo "Bearer ", uso 7 para poder quitar también el espacio que hay después
        String token = authHeader.substring(7);

        try {
            //Decodifico y valido el token con la clave secreta
            Claims claims = jwtService.extractAllClaims(token);

            //Saco el userId y el rol del payload (El payload es el conjunto útil de información) del token
            String userId = claims.getSubject();
            String role = claims.get("role", String.class);

            //Creo el objeto de autenticación con el rol como autoridad para que Spring Security lo use en las reglas
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userId,
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
            );

            //Guardo la autenticación en el contexto de seguridad de Spring
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            //Si el token es inválido o está expirado, limpio el contexto y dejo que Spring Security rehaga la petición
            log.warn("Token inválido: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        //Paso la petición al siguiente filtro de la cadena
        filterChain.doFilter(request, response);
    }
}