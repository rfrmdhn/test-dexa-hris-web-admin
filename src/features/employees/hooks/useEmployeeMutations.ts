import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '@/features/employees/api';
import { queryKeys } from '@/libs/constants/queryKeys';
import type { CreateEmployeeDto, UpdateEmployeeDto } from '@/libs/types';

interface MutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useCreateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEmployeeDto) => employeeApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
            options?.onSuccess?.();
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}

export function useUpdateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDto }) =>
            employeeApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
            queryClient.invalidateQueries({ queryKey: queryKeys.employees.detail(variables.id) });
            options?.onSuccess?.();
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}

export function useDeleteEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => employeeApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
            options?.onSuccess?.();
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}
