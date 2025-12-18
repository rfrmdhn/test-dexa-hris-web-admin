import { useState, useCallback } from 'react';
import type { PaginationParams } from '@/libs/types';

export function useTableParams<T extends PaginationParams>(initialParams: T) {
    const [params, setParams] = useState<T>(initialParams);

    const handleSearch = useCallback((search: string) => {
        setParams((prev) => ({
            ...prev,
            search: search || undefined,
            page: 1,
        }));
    }, []);

    const handleSort = useCallback((key: string) => {
        setParams((prev) => ({
            ...prev,
            sortBy: key,
            sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setParams((prev) => ({ ...prev, page }));
    }, []);

    const handleLimitChange = useCallback((limit: number) => {
        setParams((prev) => ({ ...prev, limit, page: 1 }));
    }, []);

    const setFilter = useCallback((key: keyof T, value: any) => {
        setParams((prev) => ({
            ...prev,
            [key]: value || undefined,
            page: 1,
        }));
    }, []);

    return {
        params,
        setParams,
        handleSearch,
        handleSort,
        handlePageChange,
        handleLimitChange,
        setFilter,
    };
}
