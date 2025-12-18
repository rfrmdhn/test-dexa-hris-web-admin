/**
 * Attendance API Endpoints
 * API functions for attendance monitoring (view-only)
 */

import { attendanceApiClient } from '@/libs/api/client';
import type { PaginatedApiResponse, Attendance, AttendanceQueryParams } from '@/libs/types';

export const attendanceApi = {
    /**
     * Get all attendance records with pagination and filters
     */
    getAll: async (params?: AttendanceQueryParams): Promise<PaginatedApiResponse<Attendance>> => {
        const response = await attendanceApiClient.get<PaginatedApiResponse<Attendance>>(
            '/attendance',
            { params }
        );
        return response.data;
    },
};
