

import React, { forwardRef } from 'react';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/atoms/Icon';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    options: SelectOption[];
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    placeholder?: string;
}

const sizeStyles: Record<NonNullable<SelectProps['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm pr-8',
    md: 'px-4 py-2.5 text-sm pr-10',
    lg: 'px-4 py-3 text-base pr-10',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, size = 'md', error, placeholder, className, disabled, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <select
                    ref={ref}
                    className={cn(
                        'w-full rounded-lg border bg-surface text-text-primary appearance-none cursor-pointer',
                        'transition-all duration-150 ease-in-out',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary',
                        'disabled:bg-secondary-light disabled:text-text-muted disabled:cursor-not-allowed',
                        sizeStyles[size],
                        error
                            ? 'border-danger focus:ring-danger focus:border-danger'
                            : 'border-border hover:border-border-hover',
                        className
                    )}
                    aria-invalid={error}
                    aria-required={props.required}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                    <Icon name="expand_more" size="sm" />
                </span>
            </div>
        );
    }
);

Select.displayName = 'Select';
