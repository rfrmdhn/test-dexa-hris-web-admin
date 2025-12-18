/**
 * Avatar Molecule
 * User avatar with initials fallback
 */

import React, { useMemo } from 'react';
import { cn } from '@/libs/utils';

export interface AvatarProps {
    src?: string | null;
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeStyles: Record<NonNullable<AvatarProps['size']>, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
};

const getColorFromName = (name: string): string => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-cyan-500',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
    src,
    name,
    size = 'md',
    className,
}) => {
    const initials = useMemo(() => getInitials(name), [name]);
    const bgColor = useMemo(() => getColorFromName(name), [name]);

    return (
        <div
            className={cn(
                'relative flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
                sizeStyles[size],
                !src && bgColor,
                className
            )}
            title={name}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            ) : (
                <span className="text-white font-medium">{initials}</span>
            )}
        </div>
    );
};
