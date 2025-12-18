import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/libs/utils';
import { useDebounce } from '@/libs/hooks';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';

export interface SearchBarProps {
    value?: string;
    placeholder?: string;
    debounceMs?: number;
    onChange: (value: string) => void;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value: externalValue = '',
    placeholder = 'Search...',
    debounceMs = 300,
    onChange,
    className,
}) => {
    const [internalValue, setInternalValue] = useState(externalValue);
    const debouncedValue = useDebounce(internalValue, debounceMs);

    useEffect(() => {
        if (externalValue !== debouncedValue) {
            setInternalValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        if (debouncedValue !== externalValue) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange, externalValue]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setInternalValue('');
        onChange('');
    }, [onChange]);

    return (
        <div className={cn('relative', className)}>
            <Input
                type="text"
                value={internalValue}
                onChange={handleChange}
                placeholder={placeholder}
                leftIcon={<Icon name="search" size="sm" className="text-text-muted" />}
                rightIcon={
                    internalValue ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-0.5 hover:bg-secondary-light rounded-full transition-colors"
                            aria-label="Clear search"
                        >
                            <Icon name="close" size="sm" className="text-text-muted hover:text-text-primary" />
                        </button>
                    ) : undefined
                }
            />
        </div>
    );
};
