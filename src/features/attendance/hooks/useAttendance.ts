

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { attendanceApi } from '@/features/attendance/api';
import type { AttendanceQueryParams } from '@/libs/types';

export const ATTENDANCE_QUERY_KEY = 'attendance';

export function useAttendance(params?: AttendanceQueryParams) {
    return useQuery({
        queryKey: [ATTENDANCE_QUERY_KEY, params],
        queryFn: async () => {
            const response = await attendanceApi.getAll(params);
            return {
                items: response.data,
                meta: response.meta,
            };
        },
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });
}

