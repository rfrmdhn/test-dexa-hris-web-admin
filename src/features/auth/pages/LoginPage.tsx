/**
 * LoginPage
 * Login page using AuthLayout
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { LoginForm } from '@/features/auth/components';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'ADMIN') {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
