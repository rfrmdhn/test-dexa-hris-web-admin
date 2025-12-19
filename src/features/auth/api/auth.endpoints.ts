

import apiClient from '@/libs/api/client';
import type { LoginPayload, LoginResponseData } from '@/libs/types';

export const authApi = {
    login: async (payload: LoginPayload): Promise<LoginResponseData> => {
        const response = await apiClient.post<LoginResponseData>(
            '/auth/login',
            payload
        );
        return response.data;
    },
};
