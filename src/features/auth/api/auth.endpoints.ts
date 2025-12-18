/**
 * Auth API Endpoints
 * API functions for authentication
 */

import apiClient from '@/libs/api/client';
import type { ApiResponse, LoginPayload, LoginResponseData } from '@/libs/types';

export const authApi = {
    /**
     * Login with email and password
     */
    login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> => {
        const response = await apiClient.post<ApiResponse<LoginResponseData>>(
            '/auth/login', // apiClient has baseURL set to AUTH_SERVICE_URL by default now
            payload
        );
        return response.data;
    },
};
