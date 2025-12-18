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
} from '@/libs/types';

interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const employeeApi = {
    getAll: async (params?: EmployeeQueryParams): Promise<PaginatedResponse<Employee>> => {
        const response = await apiClient.get<PaginatedResponse<Employee>>(
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
