import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { employeeApi } from '@/features/employees/api';
import type { EmployeeQueryParams } from '@/libs/types';
import { queryKeys } from '@/libs/constants/queryKeys';

export function useEmployees(params?: EmployeeQueryParams) {
    return useQuery({
        queryKey: queryKeys.employees.list(params ?? {}),
        queryFn: async () => {
            const response = await employeeApi.getAll(params);
            return {
                items: response.data,
                meta: response.meta,
            };
        },
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });
}
