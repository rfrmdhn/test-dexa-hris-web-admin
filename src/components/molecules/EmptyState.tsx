/**
 * EmptyState Molecule
 * Placeholder for empty data states
 */

import React from 'react';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/atoms/Icon';
import { Heading, Text } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';

export interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'inbox',
    title,
    description,
    actionLabel,
    onAction,
    className,
}) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-12 px-6 text-center',
                className
            )}
        >
            <div className="mb-4 p-4 bg-secondary-light rounded-full">
                <Icon name={icon} size="xl" className="text-text-muted" />
            </div>

            <Heading as="h4" className="mb-2">
                {title}
            </Heading>

            {description && (
                <Text variant="muted" className="max-w-sm mb-6">
                    {description}
                </Text>
            )}

            {actionLabel && onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
