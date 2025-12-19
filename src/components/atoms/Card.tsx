

import React from 'react';
import { cn } from '@/libs/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline';
}

export const Card: React.FC<CardProps> = ({
    className,
    variant = 'default',
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                'rounded-xl p-6 transition-all',
                variant === 'default' && 'bg-surface shadow-md',
                variant === 'outline' && 'border border-border bg-surface',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
