package com.convive.backend.mapper;

import com.convive.backend.dto.response.UserResponse;
import com.convive.backend.model.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user, String apartment) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName1(),
                user.getLastName2(),
                apartment,
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getEnabled()
        );
    }

}
