import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline';
}

export const Card: React.FC<CardProps> = ({ className, variant = 'default', children, ...props }) => {
    return (
        <div
            className={twMerge(clsx(
                "rounded-xl p-6 transition-all", // Base styles
                variant === 'default' && "bg-white dark:bg-gray-800 shadow-sm",
                variant === 'outline' && "border border-gray-200 dark:border-gray-700",
                className // User override
            ))}
            {...props}
        >
            {children}
        </div>
    );
};
