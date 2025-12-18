/**
 * Employee API Endpoints
 * API functions for employee CRUD operations
 */

import apiClient from '@/libs/api/client';
import type {
    Employee,
    EmployeeQueryParams,
    CreateEmployeeDto,
    UpdateEmployeeDto,
    PaginatedApiResponse,
} from '@/libs/types';

export const employeeApi = {
    getAll: async (params?: EmployeeQueryParams): Promise<PaginatedApiResponse<Employee>> => {
        const response = await apiClient.get<PaginatedApiResponse<Employee>>(
            '/employees',
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<Employee> => {
        const response = await apiClient.get<Employee>(
            `/employees/${id}`
        );
        return response.data;
    },

    create: async (data: CreateEmployeeDto): Promise<Employee> => {
        const response = await apiClient.post<Employee>(
            '/employees',
            data
        );
        return response.data;
    },

    update: async (id: string, data: UpdateEmployeeDto): Promise<Employee> => {
        const response = await apiClient.patch<Employee>(
            `/employees/${id}`,
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<Employee> => {
        const response = await apiClient.delete<Employee>(
            `/employees/${id}`
        );
        return response.data;
    },
};
