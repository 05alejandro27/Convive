import api from './api'

export const userService = {

    //Listar todos los usuarios
    findAll: async (communityId: number): Promise<UserResponse[]> => {
        const response = await api.get<UserResponse[]>(`/users/${communityId}`);
        return response.data;
    },

    //Editar un usuario
    edit: async (communityId: number, id: number, data: UserRequest): Promise<UserResponse> => {
        const response = await api.put<UserResponse>(
            `/users/${communityId}/${id}`,
            data
        );
        return response.data;
    },

    //Habilitar/Deshabilitar un usuario
    toggleEnable: async (communityId: number, id: number): Promise<UserResponse> => {
        const response = await api.patch<UserResponse>(`/users/${communityId}/${id}/toggle-enable`)
        return response.data;
    }
};

//Tipos
export interface UserResponse {
    id: number,
    firstName: string,
    lastName1: string,
    lastName2: string,
    apartment: string,
    email: string,
    phone: string,
    role: string,
    enabled: boolean
}

export interface UserRequest {
    firstName: string,
    lastName1: string,
    lastName2: string | null,
    email: string,
    phone: string
}