import api from './api';

export const budgetService = {

    getHistory: async (communityId: number): Promise<BudgetResponse[]> => {
        const response = await api.get<BudgetResponse[]>(`/budget/${communityId}/history`);
        return response.data;
    },

    getByBudgetId: async (communityId: number, budgetId: number): Promise<BudgetResponse> => {
        const response = await api.get<BudgetResponse>(`/budget/${communityId}/${budgetId}`);
        return response.data;
    },

    getCurrent: async (communityId: number): Promise<BudgetResponse> => {
        const response = await api.get<BudgetResponse>(`/budget/${communityId}/current`);
        return response.data;
    },

    getStats: async (communityId: number): Promise<BudgetStatsResponse> => {
        const response = await api.get<BudgetStatsResponse>(`/budget/${communityId}/current/stats`);
        return response.data;
    },

    create: async (communityId: number, data: BudgetRequest): Promise<BudgetResponse> => {
        const response = await api.post<BudgetResponse>(`/budget/${communityId}`, data);
        return response.data;
    },

    updateEmergencyFund: async (communityId: number, budgetId: number, data: BudgetEmergencyRequest): Promise<BudgetResponse> => {
        const response = await api.put<BudgetResponse>(`/budget/${communityId}/${budgetId}/emergency-fund`, data);
        return response.data;
    },

    close: async (communityId: number, budgetId: number): Promise<BudgetResponse> => {
        const response = await api.patch<BudgetResponse>(`/budget/${communityId}/${budgetId}/close`);
        return response.data;
    }
};

export interface BudgetResponse {
    id: number;
    name: string | null;
    startDate: string;
    endDate: string;
    annualAmount: number;
    emergencyFund: number;
    status: string;
}

export interface BudgetStatsResponse {
    remainingDays: number;
    spent: number;
    available: number;
    spentPercentage: number;
}

export interface BudgetRequest {
    name: string | null;
    endDate: string;
    annualAmount: number;
    emergencyFund: number;
}

export interface BudgetEmergencyRequest {
    emergencyFund: number;
}