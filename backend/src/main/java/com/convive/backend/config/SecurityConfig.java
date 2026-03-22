package com.convive.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
//Activa el módulo de seguridad
@EnableWebSecurity
//Genera un constructor con todos los atributos final
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    //Recibimos HttpSecurity de Spring y lo configuramos
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //Deshabilito la protección CSRF, ya que uso JWT (Tokens)
                .csrf(csrf -> csrf.disable())
                //Activamos CORS y le inyecto las reglas
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                //Permitimos que cualquier petición entre, configuración temporal para desarrollo
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                //No mantengo las peticiones entre sesiones, ya que uso JWT (Tokens)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        //Devuelvo las cadena con todos los filtros de seguridad creados
        return http.build();
    }

    @Bean
    //Definimos las reglas del CORS
    public CorsConfigurationSource corsConfigurationSource() {
        //Creo un objeto de configuración vacio
        CorsConfiguration configuration = new CorsConfiguration();
        //Le asignamos la URL que tiene permiso para hacer peticiones
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        //Definimos que metodos se permiten
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //Permito cualquier cabecera HTTP en las peticiones
        configuration.setAllowedHeaders(List.of("*"));
        //Creo un objeto para asociar las reglas del CORS a rutas concretas de la API
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //Agrego las reglas del CORS creadas a todas las rutas del backend
        source.registerCorsConfiguration("/**", configuration);

        //Devuelvo el objeto con las reglas del CORS
        return source;
    }

    @Bean
    //Codificador de contraseñas
    public PasswordEncoder passwordEncoder() {
        //Crea o comprueba contraseñas usando el algoritmo BCrypt
        return new BCryptPasswordEncoder();
    }
}