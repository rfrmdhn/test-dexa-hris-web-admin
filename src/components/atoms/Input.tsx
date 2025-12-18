/**
 * Input Atom
 * Text input component with validation states and icons
 */

import React, { forwardRef } from 'react';
import { cn } from '@/libs/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const sizeStyles: Record<NonNullable<InputProps['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ size = 'md', error, leftIcon, rightIcon, className, disabled, ...props }, ref) => {
        const hasLeftIcon = !!leftIcon;
        const hasRightIcon = !!rightIcon;

        return (
            <div className="relative w-full">
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                        {leftIcon}
                    </span>
                )}

                <input
                    ref={ref}
                    className={cn(
                        'w-full rounded-lg border bg-surface text-text-primary',
                        'placeholder:text-text-muted',
                        'transition-all duration-150 ease-in-out',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary',
                        'disabled:bg-secondary-light disabled:text-text-muted disabled:cursor-not-allowed',
                        sizeStyles[size],
                        hasLeftIcon && 'pl-10',
                        hasRightIcon && 'pr-10',
                        error
                            ? 'border-danger focus:ring-danger focus:border-danger'
                            : 'border-border hover:border-border-hover',
                        className
                    )}
                    disabled={disabled}
                    {...props}
                />

                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                        {rightIcon}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
