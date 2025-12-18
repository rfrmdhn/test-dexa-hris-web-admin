/**
 * Employee Mutation Hooks
 * React Query mutations for create, update, delete
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { employeeApi } from '@/features/employees/api';
import { EMPLOYEES_QUERY_KEY } from './useEmployees';
import type { CreateEmployeeDto, UpdateEmployeeDto } from '@/libs/types';

interface MutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useCreateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: CreateEmployeeDto) => employeeApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
            options?.onSuccess?.();
            navigate('/employees');
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}

export function useUpdateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDto }) =>
            employeeApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY, variables.id] });
            options?.onSuccess?.();
            navigate('/employees');
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
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
            options?.onSuccess?.();
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}
