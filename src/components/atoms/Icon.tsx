

import React from 'react';
import { cn } from '@/libs/utils';

export interface IconProps {
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    filled?: boolean;
    className?: string;
}

const sizeStyles: Record<NonNullable<IconProps['size']>, string> = {
    sm: 'text-[18px]',
    md: 'text-[24px]',
    lg: 'text-[32px]',
    xl: 'text-[48px]',
};

export const Icon: React.FC<IconProps> = ({
    name,
    size = 'md',
    filled = false,
    className,
}) => {
    return (
        <span
            className={cn(
                'material-symbols-outlined select-none',
                sizeStyles[size],
                className
            )}
            style={{
                fontVariationSettings: filled
                    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    : undefined,
            }}
            aria-hidden="true"
        >
            {name}
        </span>
    );
};
