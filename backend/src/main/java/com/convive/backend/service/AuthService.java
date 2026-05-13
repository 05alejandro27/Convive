package com.convive.backend.service;

import com.convive.backend.dto.request.LoginRequest;
import com.convive.backend.dto.request.RegisterRequest;
import com.convive.backend.dto.response.LoginResponse;
import com.convive.backend.exception.DuplicateResourceException;
import com.convive.backend.exception.InvalidCredentialsException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.model.entity.Invitation;
import com.convive.backend.model.entity.User;
import com.convive.backend.model.entity.UserApartment;
import com.convive.backend.repository.InvitationRepository;
import com.convive.backend.repository.UserApartmentRepository;
import com.convive.backend.repository.UserRepository;
import com.convive.backend.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.convive.backend.model.enums.Role.RESIDENT;

@Service
//Genera un constructor con todos los atributos final
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final InvitationRepository invitationRepository;
    private final InvitationService invitationService;
    private final UserApartmentRepository userApartmentRepository;

    //Devuelve un token en caso de que el login sea exitoso. Recibe un número de comunidad y los datos del formulario
    public LoginResponse login(Long communityId, LoginRequest loginRequest) {

        //Busca un usuario con los datos proporcionados usando la función definida en "UserRepository"
        User user = userRepository.findUserByApartmentDetails(communityId, loginRequest.floor(), loginRequest.door())
                                    .orElseThrow(() -> new InvalidCredentialsException("Planta, piso o contraseña incorrectos"));

        //Comprueba si el usuario esta activo
        if (Boolean.FALSE.equals(user.getEnabled())) {
            throw new InvalidCredentialsException("Planta, piso o contraseña incorrectos");
        }

        //Comprueba si la contraseña puesta por el usuario es la misma que la de la base de datos
        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Planta, piso o contraseña incorrectos");
        }

        //Mandamos el mismo mensaje en todos los fallos por motivos de seguridad

        //En caso de que pase el control creamos un token
        String token = jwtService.generateToken(user, communityId);

        //Devolvemos el objeto de respuesta con el token dentro
        return new LoginResponse(token);

    }

    @Transactional
    public void register(Long communityId, RegisterRequest registerRequest) {

        //Comprobar que el código existe, que no esta en uso y que no esta caducado. Además obtener el piso asociado
        Invitation invitation = invitationRepository.findValidByCodeAndCommunityId(registerRequest.code(), communityId)
                .orElseThrow(() -> new ResourceNotFoundException("El código ha expirado o ya fue utilizado. Solicita uno nuevo al presidente"));

        //Verificar que no esté en uso por otro usuario
        if (userRepository.existsByEmail(registerRequest.email())) {
            throw new DuplicateResourceException("Ya existe un usuario con ese correo");
        }

        //Verificar que no esté en uso por otro usuario
        if (userRepository.existsByPhone(registerRequest.phone())) {
            throw new DuplicateResourceException("Ya existe un usuario con ese teléfono");
        }

        //Crear el usuario y guardarlo
        User user = new User();
        user.setFirstName(registerRequest.firstName());
        user.setLastName1(registerRequest.lastName1());
        user.setLastName2(registerRequest.lastName2());
        user.setEmail(registerRequest.email());
        user.setPhone(registerRequest.phone());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        user.setRole(RESIDENT);
        user.setEnabled(true);
        user.setCreatedDate(LocalDateTime.now());
        user.setUpdatedDate(LocalDateTime.now());

        userRepository.save(user);

        //Asignar el usuario y el apartamento
        UserApartment userApartment = new UserApartment();
        userApartment.setUser(user);
        userApartment.setApartment(invitation.getApartment());
        userApartment.setAssignedDate(LocalDateTime.now());

        userApartmentRepository.save(userApartment);

        //Uso el código para que no se pueda volver a utilizar
        invitationService.use(invitation, user);

    }
}
