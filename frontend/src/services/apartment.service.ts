import api from './api';

export const apartmentService = {

    //Listar pisos con filtros opcionales
    findAll: async (communityId: number): Promise<ApartmentResponse[]> => {
        const response = await api.get<ApartmentResponse[]>(`/apartments/${communityId}`);
        return response.data;
    },

    //Estadísticas
    getStats: async (communityId: number): Promise<ApartmentStatsResponse> => {
        const response = await api.get<ApartmentStatsResponse>(
            `/apartments/${communityId}/stats`
        );
        return response.data;
    },

    //Crear piso
    create: async (communityId: number, data: ApartmentRequest): Promise<ApartmentResponse> => {
        const response = await api.post<ApartmentResponse>(
            `/apartments/${communityId}`,
            data
        );
        return response.data;
    },

    //Editar piso
    edit: async (communityId: number, id: number, data: ApartmentRequest): Promise<ApartmentResponse> => {
        const response = await api.put<ApartmentResponse>(
            `/apartments/${communityId}/${id}`,
            data
        );
        return response.data;
    },

    //Activar/Desactivar piso
    toggleActive: async (communityId: number, id: number): Promise<ApartmentResponse> => {
        const response = await api.patch<ApartmentResponse>(
            `/apartments/${communityId}/${id}/toggle-active`
        );
        return response.data;
    },
};

//Tipos
export interface ApartmentResponse {
    id: number;
    floor: number;
    door: string;
    active: boolean;
    status: string;
    residentFullName: string | null;
}

export interface ApartmentStatsResponse {
    total: number;
    occupied: number;
    empty: number;
    inactive: number;
}

export interface ApartmentRequest {
    floor: number;
    door: string;
}