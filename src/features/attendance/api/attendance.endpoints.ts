/**
 * Attendance API Endpoints
 * API functions for attendance monitoring (view-only)
 */

import apiClient from '@/libs/api/client';
import type { ApiResponse, PaginatedData, Attendance, AttendanceQueryParams } from '@/libs/types';

export const attendanceApi = {
    /**
     * Get all attendance records with pagination and filters
     */
    getAll: async (params?: AttendanceQueryParams): Promise<ApiResponse<PaginatedData<Attendance>>> => {
        const response = await apiClient.get<ApiResponse<PaginatedData<Attendance>>>(
            '/attendance',
            { params }
        );
        return response.data;
    },
};
