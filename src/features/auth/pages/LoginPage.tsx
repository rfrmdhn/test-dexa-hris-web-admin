import React from 'react';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { LoginForm } from '@/features/auth/components';

export const LoginPage: React.FC = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
