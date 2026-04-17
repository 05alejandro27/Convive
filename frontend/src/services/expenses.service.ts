import api from './api';

export const expenseService = {

    findAll: async (budgetId: number): Promise<ExpenseResponse[]> => {
        const response = await api.get<ExpenseResponse[]>(`/expenses/${budgetId}`);
        return response.data;
    },

    findByMonth: async (budgetId: number, month: number): Promise<ExpenseResponse[]> => {
        const response = await api.get<ExpenseResponse[]>(
            `/expenses/${budgetId}/month/${month}`
        );
        return response.data;
    },

    create: async (budgetId: number, data: ExpenseRequest): Promise<ExpenseResponse> => {
        const response = await api.post<ExpenseResponse>(
            `/expenses/${budgetId}`,
            data
        );
        return response.data;
    },

    edit: async (budgetId: number, expenseId: number, data: ExpenseRequest): Promise<ExpenseResponse> => {
        const response = await api.put<ExpenseResponse>(
            `/expenses/${budgetId}/${expenseId}`,
            data
        );
        return response.data;
    },

    delete: async (budgetId: number, expenseId: number): Promise<void> => {
        await api.delete(`/expenses/${budgetId}/${expenseId}`);
    }
};

export interface ExpenseResponse {
    id: number;
    name: string;
    description: string | null;
    expenseType: 'FIXED' | 'VARIABLE';
    cost: number;
    month: number;
    createdDate: string;
}

export interface ExpenseRequest {
    name: string;
    description: string | null;
    expenseType: 'FIXED' | 'VARIABLE';
    cost: number;
    month: number;
}