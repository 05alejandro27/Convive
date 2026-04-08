import api from './api';

//Aquí guardo el objeto con todos los métodos de autenticación
export const authService = {
    login: async (communityId: number, data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>(`/auth/login/${communityId}`, data);
        return response.data;
    },
    
    register: async (communityId: number, data: RegisterRequest): Promise<void> => {
        await api.post<RegisterRequest>(`/auth/register/${communityId}`, data);
    }
};

export interface RegisterRequest {
    code: string;
    firstName: string;
    lastName1: string;
    lastName2?: string | null;
    email: string;
    phone: string;
    password: string;
}

interface LoginRequest {
    floor: number;
    door: string;
    password: string;
}

interface LoginResponse {
    token: string;
}