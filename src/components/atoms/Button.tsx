/**
 * Button Atom
 * Reusable button component with variants, sizes, and loading state
 */

import React from 'react';
import { cn } from '@/libs/utils';
import { Spinner } from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-dark shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary shadow-sm',
    danger: 'bg-danger text-white hover:bg-danger-hover active:bg-red-700 shadow-sm',
    ghost: 'bg-transparent text-text-secondary hover:bg-secondary-light active:bg-border',
    outline: 'bg-transparent border border-border text-text-primary hover:bg-secondary-light active:bg-border',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    children,
    ...props
}) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium rounded-lg',
                'transition-all duration-150 ease-in-out',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <Spinner size={size === 'lg' ? 'md' : 'sm'} className="text-current" />
            ) : leftIcon ? (
                <span className="flex-shrink-0">{leftIcon}</span>
            ) : null}

            {children && <span>{children}</span>}

            {!isLoading && rightIcon && (
                <span className="flex-shrink-0">{rightIcon}</span>
            )}
        </button>
    );
};
