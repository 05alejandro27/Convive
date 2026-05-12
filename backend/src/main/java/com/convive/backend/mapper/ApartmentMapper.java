package com.convive.backend.mapper;

import com.convive.backend.dto.response.ApartmentResponse;
import com.convive.backend.model.entity.Apartment;
import org.springframework.stereotype.Component;

@Component
//Aunque podríamos hacerlo en en Service he decidido separarlo para que el Service se encarge de la lóica de negocio y el mapper de transformar datos
public class ApartmentMapper {

    //Convierte la entidad Apartment a ApartmentResponse (DTO)
    //El status y el residentFullName los calcula el Service y se los pasa aquí
    public ApartmentResponse toResponse(Apartment apartment, String status, String residentFullName) {
        return new ApartmentResponse(
                apartment.getId(),
                apartment.getFloor(),
                apartment.getDoor(),
                apartment.getActive(),
                status,
                residentFullName
        );
    }
}