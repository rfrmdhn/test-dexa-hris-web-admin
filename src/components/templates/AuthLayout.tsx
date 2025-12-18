import React from 'react';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Typography';

export interface AuthLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                'min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10',
                'flex flex-col items-center justify-center p-4'
            )}
        >
            <div className="mb-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <Icon name="admin_panel_settings" size="xl" className="text-white" />
                </div>
                <Text className="text-2xl font-bold text-text-primary">HRIS Admin</Text>
                <Text variant="muted" className="mt-1">HRIS Technical Test Dexa</Text>
            </div>

            <div
                className={cn(
                    'w-full max-w-md bg-surface rounded-2xl shadow-xl p-8',
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};
