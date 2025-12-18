import React from 'react';
import { cn } from '@/libs/utils';
import { Heading, Text } from '@/components/atoms/Typography';

export interface TopBarProps {
    title: string;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
    title,
    subtitle,
    actions,
    className,
}) => {
    return (
        <header
            className={cn(
                'h-16 bg-surface border-b border-border px-6 flex items-center justify-between sticky top-0 z-30',
                className
            )}
        >
            <div>
                <Heading as="h1" className="text-xl">
                    {title}
                </Heading>
                {subtitle && (
                    <Text size="sm" variant="muted">
                        {subtitle}
                    </Text>
                )}
            </div>

            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </header>
    );
};
