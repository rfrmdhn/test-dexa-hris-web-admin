/**
 * useAttendanceFilters Hook
 * Manages filter state and logic for the Attendance page
 */

import { useMemo, useCallback } from 'react';
import { useEmployees } from '@/features/employees/hooks';
import { useTableParams } from '@/libs/hooks';
import { getTodayISO } from '@/libs/utils';
import type { AttendanceQueryParams } from '@/libs/types';
import type { SelectOption } from '@/components/molecules/Select';

export function useAttendanceFilters() {
    const today = getTodayISO();

    const {
        params,
        handleSort,
        handlePageChange,
        handleLimitChange,
        setFilter,
    } = useTableParams<AttendanceQueryParams>({
        page: 1,
        limit: 10,
        sortBy: 'checkInTime',
        sortOrder: 'desc',
        startDate: today,
        endDate: today,
    });

    // Fetch employees for the filter dropdown
    const { data: employeesData } = useEmployees({ limit: 100 });

    const employeeOptions: SelectOption[] = useMemo(() => {
        const options: SelectOption[] = [{ value: '', label: 'All Employees' }];
        if (employeesData?.items) {
            employeesData.items.forEach((emp) => {
                options.push({ value: emp.id, label: emp.name });
            });
        }
        return options;
    }, [employeesData]);

    const handleEmployeeFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter('userId', e.target.value);
    }, [setFilter]);

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter('startDate', e.target.value);
    }, [setFilter]);

    const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter('endDate', e.target.value);
    }, [setFilter]);

    return {
        params,
        employeeOptions,
        handleSort,
        handlePageChange,
        handleLimitChange,
        handleEmployeeFilter,
        handleStartDateChange,
        handleEndDateChange,
    };
}
