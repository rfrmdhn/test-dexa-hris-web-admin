/**
 * useLogin Hook
 * React Query mutation for login
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import type { LoginPayload } from '@/libs/types';

interface UseLoginOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useLogin(options?: UseLoginOptions) {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const response = await authApi.login(payload);

            if (!response.success) {
                throw new Error(response.message || 'Login failed');
            }

            // Verify role is ADMIN
            if (response.data.user.role !== 'ADMIN') {
                throw new Error('Access denied. Admin privileges required.');
            }

            return response.data;
        },
        onSuccess: (data) => {
            // Store auth data
            login(data.access_token, data.user);

            // Custom callback
            options?.onSuccess?.();

            // Navigate to dashboard
            navigate('/');
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}
