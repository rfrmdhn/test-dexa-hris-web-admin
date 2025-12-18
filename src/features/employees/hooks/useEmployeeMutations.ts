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

/**
 * Create employee mutation
 */
export function useCreateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: CreateEmployeeDto) => {
            const response = await employeeApi.create(data);
            if (!response.success) {
                throw new Error(response.message || 'Failed to create employee');
            }
            return response.data;
        },
        onSuccess: () => {
            // Invalidate list cache
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
            options?.onSuccess?.();
            navigate('/employees');
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}

/**
 * Update employee mutation
 */
export function useUpdateEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateEmployeeDto }) => {
            const response = await employeeApi.update(id, data);
            if (!response.success) {
                throw new Error(response.message || 'Failed to update employee');
            }
            return response.data;
        },
        onSuccess: (_, variables) => {
            // Invalidate list and detail cache
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

/**
 * Delete employee mutation
 */
export function useDeleteEmployee(options?: MutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await employeeApi.delete(id);
            if (!response.success) {
                throw new Error(response.message || 'Failed to delete employee');
            }
            return response.data;
        },
        onSuccess: () => {
            // Invalidate list cache
            queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
            options?.onSuccess?.();
        },
        onError: (error: Error) => {
            options?.onError?.(error);
        },
    });
}
