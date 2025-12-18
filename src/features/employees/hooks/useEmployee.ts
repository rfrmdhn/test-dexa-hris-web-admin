/**
 * useEmployee Hook
 * React Query hook for single employee
 */

import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/features/employees/api';
import { EMPLOYEES_QUERY_KEY } from './useEmployees';

export function useEmployee(id: string | undefined) {
    return useQuery({
        queryKey: [EMPLOYEES_QUERY_KEY, id],
        queryFn: async () => {
            if (!id) throw new Error('Employee ID is required');

            const response = await employeeApi.getById(id);
            if (!response.success) {
                throw new Error(response.message || 'Failed to fetch employee');
            }
            return response.data;
        },
        enabled: !!id,
        staleTime: 60 * 1000, // 1 minute
    });
}
