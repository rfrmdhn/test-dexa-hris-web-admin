/**
 * Employee API Endpoints
 * API functions for employee CRUD operations
 */

import apiClient from '@/libs/api/client';
import type {
    ApiResponse,
    PaginatedApiResponse,
    Employee,
    EmployeeQueryParams,
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from '@/libs/types';

export const employeeApi = {
    /**
     * Get all employees with pagination and filters
     */
    getAll: async (params?: EmployeeQueryParams): Promise<PaginatedApiResponse<Employee>> => {
        const response = await apiClient.get<PaginatedApiResponse<Employee>>(
            '/employees',
            { params }
        );
        return response.data;
    },

    /**
     * Get employee by ID
     */
    getById: async (id: string): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.get<ApiResponse<Employee>>(
            `/employees/${id}`
        );
        return response.data;
    },

    /**
     * Create new employee
     */
    create: async (data: CreateEmployeeDto): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.post<ApiResponse<Employee>>(
            '/employees',
            data
        );
        return response.data;
    },

    /**
     * Update employee
     */
    update: async (id: string, data: UpdateEmployeeDto): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.patch<ApiResponse<Employee>>(
            `/employees/${id}`,
            data
        );
        return response.data;
    },

    /**
     * Delete employee
     */
    delete: async (id: string): Promise<ApiResponse<null>> => {
        const response = await apiClient.delete<ApiResponse<null>>(
            `/employees/${id}`
        );
        return response.data;
    },
};
