/**
 * useEmployees Hook
 * React Query hook for employee list with pagination
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { employeeApi } from '@/features/employees/api';
import type { EmployeeQueryParams } from '@/libs/types';

export const EMPLOYEES_QUERY_KEY = 'employees';

export function useEmployees(params?: EmployeeQueryParams) {
    return useQuery({
        queryKey: [EMPLOYEES_QUERY_KEY, params],
        queryFn: async () => {
            const response = await employeeApi.getAll(params);
            if (!response.success) {
                throw new Error(response.message || 'Failed to fetch employees');
            }
            return {
                items: response.data,
                meta: response.meta,
            };
        },
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000, // 30 seconds
    });
}
