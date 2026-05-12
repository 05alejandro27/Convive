package com.convive.backend.dto.response;

import com.convive.backend.model.enums.Role;

public record UserResponse(

        Long id,
        String firstName,
        String lastName1,
        String lastName2,
        String apartment,
        String email,
        String phone,
        Role role,
        Boolean enabled

) {}
