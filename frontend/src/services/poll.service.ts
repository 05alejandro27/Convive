import api from './api';

export const pollService = {

    findAll: async (communityId: number): Promise<PollResponse[]> => {
        const response = await api.get<PollResponse[]>(`/polls/${communityId}`);
        return response.data;
    },

    findById: async (communityId: number, pollId: number): Promise<PollResponse> => {
        const response = await api.get<PollResponse>(`/polls/${communityId}/${pollId}`);
        return response.data;
    },

    create: async (communityId: number, data: PollRequest): Promise<PollResponse> => {
        const response = await api.post<PollResponse>(`/polls/${communityId}`, data);
        return response.data;
    },

    getVotes: async (communityId: number, pollId: number): Promise<VoteResponse[]> => {
        const response = await api.get<VoteResponse[]>(`/polls/${communityId}/${pollId}/votes`);
        return response.data;
    },

    vote: async (communityId: number, pollId: number, data: VoteRequest): Promise<VoteResponse> => {
        const response = await api.post<VoteResponse>(`/polls/${communityId}/${pollId}/vote`, data);
        return response.data;
    },
};

export interface PollResponse {
    id: number;
    title: string;
    description: string;
    creatorName: string;
    status: 'OPEN' | 'CLOSED';
    deadline: string;
    totalVotes: number;
    userVoted: boolean;
}

export interface VoteResponse {
    id: number;
    voterName: string;
    apartment: string;
    voteValue: 'IN_FAVOR' | 'AGAINST' | 'ABSTAIN';
}

export interface PollRequest {
    title: string;
    description: string;
    deadline: string;
}

export interface VoteRequest {
    voteValue: 'IN_FAVOR' | 'AGAINST' | 'ABSTAIN';
}