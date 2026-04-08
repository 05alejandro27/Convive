package com.convive.backend.service;

import com.convive.backend.dto.request.UserRequest;
import com.convive.backend.dto.response.UserResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.DuplicateResourceException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.UserMapper;
import com.convive.backend.model.entity.User;
import com.convive.backend.repository.UserApartmentRepository;
import com.convive.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.convive.backend.model.enums.Role.PRESIDENT;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserApartmentRepository userApartmentRepository;

    //Lógica de negocio
    private UserResponse buildResponse(User user) {

        String apartment = userApartmentRepository.findByUserId(user.getId())
                .map(ua -> ua.getApartment().getFloor() + ua.getApartment().getDoor())
                .orElse(null);

        return userMapper.toResponse(user, apartment);
    }

    //Listar usuarios de una comunidad
    public List<UserResponse> findAllByCommunityId(Long communityId) {

        List<User> users = userRepository.findByCommunityId(communityId);

        return users.stream()
                .map(this::buildResponse)
                .toList();
    }

    //Editar un usuario
    public UserResponse editUser(Long communityId, Long userId, UserRequest request) {

        //Buscar el usuario asegurándonos de que pertenece a esa comunidad
        User user = userRepository.findByIdAndCommunityId(communityId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        //Si cambió el email, verificar que no esté en uso por otro usuario
        if (!user.getEmail().equals(request.email())
                && userRepository.existsByEmailExcludingId(request.email(), userId)) {
            throw new DuplicateResourceException("Ya existe un usuario con ese correo");
        }

        //Si cambió el teléfono, verificar que no esté en uso por otro usuario
        if (!user.getPhone().equals(request.phone())
                && userRepository.existsByPhoneExcludingId(request.phone(), userId)) {
            throw new DuplicateResourceException("Ya existe un usuario con ese teléfono");
        }

        //Actualiza los campos
        user.setFirstName(request.firstName());
        user.setLastName1(request.lastName1());
        user.setLastName2(request.lastName2());
        user.setPhone(request.phone());
        user.setEmail(request.email());
        user.setUpdatedDate(LocalDateTime.now());

        User saved = userRepository.save(user);

        return buildResponse(saved);
    }

    //Habilitar o deshabilitar un usuario
    public UserResponse toggleEnable(Long communityId, Long userId) {

        //Buscar el usuario asegurándonos de que pertenece a esa comunidad
        User user = userRepository.findByIdAndCommunityId(communityId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (user.getRole().equals(PRESIDENT)) {
            throw new BusinessRuleException("No se puede deshabilitar al presidente");
        }

        user.setEnabled(!user.getEnabled());
        user.setUpdatedDate(LocalDateTime.now());

        User saved = userRepository.save(user);

        return buildResponse(saved);
    }
}
