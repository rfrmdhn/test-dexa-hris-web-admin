

import React from 'react';
import { createPortal } from 'react-dom';
import { useToastStore, type ToastType } from '@/stores/useToastStore';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/libs/utils';

const toastStyles: Record<ToastType, string> = {
    success: 'bg-white border-success text-text-primary',
    error: 'bg-white border-danger text-text-primary',
    warning: 'bg-white border-warning text-text-primary',
    info: 'bg-white border-info text-text-primary',
};

const iconStyles: Record<ToastType, string> = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
};

const iconNames: Record<ToastType, string> = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
};

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={cn(
                        'pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 transition-all animate-in slide-in-from-right duration-300',
                        toastStyles[toast.type]
                    )}
                    role="alert"
                >
                    <Icon
                        name={iconNames[toast.type]}
                        className={cn('flex-shrink-0 mt-0.5', iconStyles[toast.type])}
                    />
                    <div className="flex-1 min-w-0">
                        {toast.title && (
                            <h4 className="font-medium text-sm mb-1">{toast.title}</h4>
                        )}
                        <p className="text-sm text-text-secondary">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-text-muted hover:text-text-primary transition-colors"
                        aria-label="Close notification"
                    >
                        <Icon name="close" size="sm" />
                    </button>
                </div>
            ))}
        </div>,
        document.body
    );
};
