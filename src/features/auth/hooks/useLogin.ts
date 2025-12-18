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
            const data = await authApi.login(payload);

            if (data.user.role !== 'ADMIN') {
                throw new Error('Access denied. Admin privileges required.');
            }

            return data;
        },
        onSuccess: (data) => {
            login(data.access_token, data.user);

            options?.onSuccess?.();

            navigate('/dashboard');
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}
