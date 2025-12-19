

import React from 'react';
import { cn } from '@/libs/utils';
import { Input, type InputProps } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Typography';

export interface FormFieldProps extends Omit<InputProps, 'error'> {
    label: string;
    error?: string;
    hint?: string;
    required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    hint,
    required,
    id,
    className,
    ...inputProps
}) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={cn('space-y-1', className)}>
            <Label htmlFor={fieldId} required={required}>
                {label}
            </Label>

            <Input
                id={fieldId}
                error={!!error}
                aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
                aria-invalid={!!error}
                {...inputProps}
            />

            {error && (
                <p id={`${fieldId}-error`} className="text-sm text-danger" role="alert">
                    {error}
                </p>
            )}

            {!error && hint && (
                <p id={`${fieldId}-hint`} className="text-sm text-text-muted">
                    {hint}
                </p>
            )}
        </div>
    );
};
