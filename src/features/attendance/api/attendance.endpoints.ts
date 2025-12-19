

import { attendanceApiClient } from '@/libs/api/client';
import type { PaginatedApiResponse, Attendance, AttendanceQueryParams } from '@/libs/types';

export const attendanceApi = {

    getAll: async (params?: AttendanceQueryParams): Promise<PaginatedApiResponse<Attendance>> => {
        const response = await attendanceApiClient.get<PaginatedApiResponse<Attendance>>(
            '/attendance',
            { params }
        );
        return response.data;
    },
};
