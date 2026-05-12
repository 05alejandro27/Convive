import api from './api';

export const invitationService = {

    //Listar todos los códigos de invitación
    findAll: async (communityId: number): Promise<InvitationListResponse[]> => {
        const response = await api.get<InvitationListResponse[]>(`/invitations/${communityId}`);
        return response.data;
    },

    //Crear un nuevo código de invitación asignado a un piso concreto
    createCode: async (communityId: number, data: InvitationRequest): Promise<InvitationResponse> => {
        const response = await api.post<InvitationResponse>(`/invitations/${communityId}`, data);
        return response.data;
    }

}

//Tipos
export interface InvitationRequest {
    floor: number;
    door: string;
}

export interface InvitationListResponse {
    floor: number;
    door: string;
    code: string;
    used: boolean;
    createdDate: string;
    expiresDate: string;
}

export interface InvitationResponse {
    code: string;
}