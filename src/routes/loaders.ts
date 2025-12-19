import { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { queryKeys } from '@/libs/constants/queryKeys';
import { employeeApi } from '@/features/employees/api';
import { attendanceApi } from '@/features/attendance/api';
import type { AttendanceQueryParams, EmployeeQueryParams } from '@/libs/types';
import { getTodayISO } from '@/libs/utils';

export const employeeListLoader = (queryClient: QueryClient) => async () => {
    const params: EmployeeQueryParams = { limit: 10, page: 1 };
    return queryClient.ensureQueryData({
        queryKey: queryKeys.employees.list(params),
        queryFn: async () => {
            const response = await employeeApi.getAll(params);
            return { items: response.data, meta: response.meta };
        },
    });
};

export const employeeDetailLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) throw new Error('No employee ID provided');
    return queryClient.ensureQueryData({
        queryKey: queryKeys.employees.detail(id),
        queryFn: async () => {
            return employeeApi.getById(id);
        },
    });
};

export const attendanceListLoader = (queryClient: QueryClient) => async () => {
    const today = getTodayISO();
    const params: AttendanceQueryParams = {
        limit: 10,
        page: 1,
        startDate: today,
        endDate: today,
        sortBy: 'checkInTime',
        sortOrder: 'desc'
    };

    return queryClient.ensureQueryData({
        queryKey: queryKeys.attendance.list(params),
        queryFn: async () => {
            const response = await attendanceApi.getAll(params);
            return { items: response.data, meta: response.meta };
        },
    });
};

export const loginLoader = () => async () => {
    const { useAuthStore } = await import('@/features/auth/stores/useAuthStore');
    const { isAuthenticated, user } = useAuthStore.getState();
    if (isAuthenticated && user?.role === 'ADMIN') {
        const { redirect } = await import('react-router-dom');
        return redirect('/dashboard');
    }
    return null;
};
