/**
 * Employee API Endpoints
 * API functions for employee CRUD operations
 */

import apiClient from '@/libs/api/client';
import type {
    ApiResponse,
    PaginatedData,
    Employee,
    EmployeeQueryParams,
    CreateEmployeeDto,
    UpdateEmployeeDto,
} from '@/libs/types';

export const employeeApi = {
    /**
     * Get all employees with pagination and filters
     */
    getAll: async (params?: EmployeeQueryParams): Promise<ApiResponse<PaginatedData<Employee>>> => {
        const response = await apiClient.get<ApiResponse<PaginatedData<Employee>>>(
            '/api/employees',
            { params }
        );
        return response.data;
    },

    /**
     * Get employee by ID
     */
    getById: async (id: string): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.get<ApiResponse<Employee>>(
            `/api/employees/${id}`
        );
        return response.data;
    },

    /**
     * Create new employee
     */
    create: async (data: CreateEmployeeDto): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.post<ApiResponse<Employee>>(
            '/api/employees',
            data
        );
        return response.data;
    },

    /**
     * Update employee
     */
    update: async (id: string, data: UpdateEmployeeDto): Promise<ApiResponse<Employee>> => {
        const response = await apiClient.patch<ApiResponse<Employee>>(
            `/api/employees/${id}`,
            data
        );
        return response.data;
    },

    /**
     * Delete employee
     */
    delete: async (id: string): Promise<ApiResponse<null>> => {
        const response = await apiClient.delete<ApiResponse<null>>(
            `/api/employees/${id}`
        );
        return response.data;
    },
};
