import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/features/employees/api';
import { queryKeys } from '@/libs/constants/queryKeys';

export function useEmployee(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.employees.detail(id ?? ''),
        queryFn: async () => {
            if (!id) throw new Error('Employee ID is required');
            return employeeApi.getById(id);
        },
        enabled: !!id,
        staleTime: 60 * 1000,
    });
}
