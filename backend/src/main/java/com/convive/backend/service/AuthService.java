package com.convive.backend.service;

import com.convive.backend.dto.request.LoginRequest;
import com.convive.backend.dto.response.LoginResponse;
import com.convive.backend.exception.InvalidCredentialsException;
import com.convive.backend.model.entity.User;
import com.convive.backend.repository.UserRepository;
import com.convive.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
//Genera un constructor con todos los atributos final
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    //Devuelve un token en caso de que el login sea exitoso. Recibe un número de comunidad y los datos del formulario
    public LoginResponse login(Long communityId, LoginRequest loginRequest){

        //Busca un usuario con los datos proporcionados usando la función definida en "UserRepository"
        User user = userRepository.findUserByApartmentDetails(communityId, loginRequest.floor(), loginRequest.door())
                                    .orElseThrow(() -> new InvalidCredentialsException("Planta, piso o contraseña incorrectos"));

        //Comprueba si el usuario esta activo
        if (Boolean.FALSE.equals(user.getEnabled())) {
            throw new InvalidCredentialsException("Planta, piso o contraseña incorrectos");
        }

        //Comprueba si la contraseña puesta por el usuario es la misma que la de la base de datos
        if (!passwordEncoder.matches(loginRequest.password().trim(), user.getPassword().trim())) {
            throw new InvalidCredentialsException("Planta, piso o contraseña incorrectos");
        }

        //Mandamos el mismo mensaje en todos los fallos por motivos de seguridad

        //En caso de que pase el control creamos un token
        String token = jwtService.generateToken(user, communityId);

        //Devolvemos el objeto de respuesta con el token dentro
        return new LoginResponse(token);

    }
}
