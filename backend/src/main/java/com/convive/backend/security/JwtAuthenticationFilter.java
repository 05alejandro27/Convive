package com.convive.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

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
            Claims claims = Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

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

    //Decodifico la clave secreta en un formato válido para el algoritmo de firmado
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}