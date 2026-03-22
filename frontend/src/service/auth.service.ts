import api from './api';

//Aquí guardo el objeto con todos los métodos de autenticación
export const authService = {
    login: async (communityId: number, data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>(
            `/auth/login/${communityId}`,
            data
        );
        return response.data;
    },
};

interface LoginRequest {
    floor: number;
    door: string;
    password: string;
}

interface LoginResponse {
    token: string;
}