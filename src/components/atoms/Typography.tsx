/**
 * Typography Atoms
 * Heading and Text components for consistent typography
 */

import React from 'react';
import { cn } from '@/libs/utils';

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingStyles: Record<NonNullable<HeadingProps['as']>, string> = {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    h5: 'text-base font-medium',
    h6: 'text-sm font-medium',
};

export const Heading: React.FC<HeadingProps> = ({
    as: Component = 'h2',
    className,
    children,
    ...props
}) => {
    return (
        <Component
            className={cn('text-text-primary', headingStyles[Component], className)}
            {...props}
        >
            {children}
        </Component>
    );
};

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    size?: 'xs' | 'sm' | 'base' | 'lg';
    variant?: 'default' | 'muted' | 'secondary';
    as?: 'p' | 'span' | 'div';
}

const textSizeStyles: Record<NonNullable<TextProps['size']>, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
};

const textVariantStyles: Record<NonNullable<TextProps['variant']>, string> = {
    default: 'text-text-primary',
    secondary: 'text-text-secondary',
    muted: 'text-text-muted',
};

export const Text: React.FC<TextProps> = ({
    size = 'base',
    variant = 'default',
    as: Component = 'p',
    className,
    children,
    ...props
}) => {
    return (
        <Component
            className={cn(textSizeStyles[size], textVariantStyles[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
};

// Label Component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
    required,
    className,
    children,
    ...props
}) => {
    return (
        <label
            className={cn('block text-sm font-medium text-text-primary mb-1.5', className)}
            {...props}
        >
            {children}
            {required && <span className="text-danger ml-0.5">*</span>}
        </label>
    );
};
