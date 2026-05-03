package com.convive.backend.config;

import com.convive.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    //Recibimos HttpSecurity de Spring y lo configuramos
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //Deshabilito la protección CSRF, ya que uso JWT (Tokens)
                .csrf(csrf -> csrf.disable())
                //Activamos CORS y le inyecto las reglas
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                //Protegemos las rutas para que obligatoriamente tengas que estar logeado y también protegemos las rutas a las que solo pueda acceder el presidente.
                .authorizeHttpRequests(auth -> auth

                        //Públicos
                        .requestMatchers("/api/auth/**").permitAll()

                        //Pisos (Presidente)
                        .requestMatchers("/api/apartments/**").hasRole("PRESIDENT")

                        //Usuarios (Presidente)
                        .requestMatchers("/api/users/**").hasRole("PRESIDENT")

                        //Invitaciones (Presidente)
                        .requestMatchers("/api/invitations/**").hasRole("PRESIDENT")

                        //Presupuesto. Lectura para todos y escritura solo presidente
                        .requestMatchers(HttpMethod.GET, "/api/budget/**").authenticated()
                        .requestMatchers("/api/budget/**").hasRole("PRESIDENT")

                        //Gastos. Lectura para todos y escritura solo presidente
                        .requestMatchers(HttpMethod.GET, "/api/expenses/**").authenticated()
                        .requestMatchers("/api/expenses/**").hasRole("PRESIDENT")

                        //Votaciones. Lectura para todos y escritura solo presidente, excepto votar que pueden los residentes
                        .requestMatchers(HttpMethod.POST, "/api/polls/{communityId}/{pollId}/vote").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/polls/{communityId}").hasRole("PRESIDENT")
                        .requestMatchers(HttpMethod.GET, "/api/polls/**").authenticated()

                        //El resto requiere autenticación
                        .anyRequest().authenticated()
                )
                //No mantengo las peticiones entre sesiones, ya que uso JWT (Tokens)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //Ejecuta el filtro JWT antes de evaluar las reglas de acceso
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

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
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
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