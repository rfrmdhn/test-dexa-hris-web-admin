/**
 * ConfirmDialog Molecule
 * Modal dialog for confirming destructive actions
 */

import React, { useEffect, useRef } from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Heading, Text } from '@/components/atoms/Typography';

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isLoading) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isLoading, onClose]);

    const iconName = variant === 'danger' ? 'warning' : variant === 'warning' ? 'error' : 'info';
    const iconColor = variant === 'danger' ? 'text-danger' : variant === 'warning' ? 'text-warning' : 'text-info';

    if (!isOpen) return null;

    return (
        <dialog
            ref={dialogRef}
            className={cn(
                'fixed inset-0 z-50 m-auto p-0 bg-transparent',
                'backdrop:bg-black/50 backdrop:backdrop-blur-sm'
            )}
            onClick={(e) => {
                if (e.target === dialogRef.current && !isLoading) {
                    onClose();
                }
            }}
        >
            <div className="bg-surface rounded-xl shadow-xl max-w-md w-full mx-auto p-6">
                <div className="flex items-start gap-4">
                    <div className={cn('flex-shrink-0 p-2 rounded-full',
                        variant === 'danger' && 'bg-danger-light',
                        variant === 'warning' && 'bg-warning-light',
                        variant === 'info' && 'bg-info-light'
                    )}>
                        <Icon name={iconName} className={iconColor} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <Heading as="h3" className="mb-2">
                            {title}
                        </Heading>
                        <Text variant="secondary" className="whitespace-pre-wrap">
                            {message}
                        </Text>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        isLoading={isLoading}
                        autoFocus
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </dialog>
    );
};
