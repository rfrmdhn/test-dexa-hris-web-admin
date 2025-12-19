

import React from 'react';
import { cn } from '@/libs/utils';

export interface BadgeProps {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    children: React.ReactNode;
    className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-secondary-light text-text-secondary',
    primary: 'bg-primary-light text-primary-dark',
    success: 'bg-success-light text-green-800',
    warning: 'bg-warning-light text-amber-800',
    danger: 'bg-danger-light text-red-800',
    info: 'bg-info-light text-blue-800',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
};

export const Badge: React.FC<BadgeProps> = ({
    variant = 'default',
    size = 'md',
    children,
    className,
}) => {
    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {children}
        </span>
    );
};
