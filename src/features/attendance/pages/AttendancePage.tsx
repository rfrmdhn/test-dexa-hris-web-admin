/**
 * AttendancePage
 * Page for viewing attendance records (VIEW ONLY)
 */

import React, { useState, useCallback, useMemo } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';
import { Label, Text } from '@/components/atoms/Typography';
import { Badge } from '@/components/atoms/Badge';
import { Select, type SelectOption } from '@/components/molecules/Select';
import { Pagination } from '@/components/molecules/Pagination';
import { AttendanceTable } from '@/features/attendance/components';
import { useAttendance } from '@/features/attendance/hooks';
import { useEmployees } from '@/features/employees/hooks';
import { getTodayISO } from '@/libs/utils';
import type { AttendanceQueryParams } from '@/libs/types';

export const AttendancePage: React.FC = () => {
    // Get today's date for default filter
    const today = getTodayISO();

    // Query params state
    const [params, setParams] = useState<AttendanceQueryParams>({
        page: 1,
        limit: 10,
        sortBy: 'date',
        sortOrder: 'desc',
        startDate: today,
        endDate: today,
    });

    // Fetch attendance
    const { data, isLoading, error } = useAttendance(params);

    // Fetch employees for filter dropdown
    const { data: employeesData } = useEmployees({ limit: 100 });

    // Build employee options
    const employeeOptions: SelectOption[] = useMemo(() => {
        const options: SelectOption[] = [{ value: '', label: 'All Employees' }];
        if (employeesData?.items) {
            employeesData.items.forEach((emp) => {
                options.push({ value: emp.id, label: emp.name });
            });
        }
        return options;
    }, [employeesData]);

    // Handlers
    const handleEmployeeFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setParams((prev) => ({
            ...prev,
            userId: e.target.value || undefined,
            page: 1,
        }));
    }, []);

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setParams((prev) => ({
            ...prev,
            startDate: e.target.value || undefined,
            page: 1,
        }));
    }, []);

    const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setParams((prev) => ({
            ...prev,
            endDate: e.target.value || undefined,
            page: 1,
        }));
    }, []);

    const handleSort = useCallback((key: string) => {
        setParams((prev) => ({
            ...prev,
            sortBy: key,
            sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setParams((prev) => ({ ...prev, page }));
    }, []);

    // Memoized values
    const attendance = useMemo(() => data?.items ?? [], [data]);
    const meta = useMemo(
        () =>
            data?.meta ?? {
                total: 0,
                page: 1,
                limit: 10,
                lastPage: 1,
            },
        [data]
    );

    return (
        <DashboardLayout
            title="Attendance Monitoring"
            subtitle={
                <span className="flex items-center gap-2">
                    <span>{meta.total} records</span>
                    <Badge variant="info" size="sm">
                        <Icon name="visibility" size="sm" className="mr-1" />
                        View Only
                    </Badge>
                </span>
            }
        >
            <Card>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 max-w-xs">
                        <Label htmlFor="employee-filter">Employee</Label>
                        <Select
                            id="employee-filter"
                            value={params.userId ?? ''}
                            onChange={handleEmployeeFilter}
                            options={employeeOptions}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={params.startDate ?? ''}
                                onChange={handleStartDateChange}
                                leftIcon={<Icon name="calendar_today" size="sm" />}
                            />
                        </div>

                        <div>
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={params.endDate ?? ''}
                                onChange={handleEndDateChange}
                                leftIcon={<Icon name="calendar_today" size="sm" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Info banner */}
                <div className="mb-4 p-3 bg-info-light rounded-lg flex items-center gap-2">
                    <Icon name="info" size="sm" className="text-info" />
                    <Text size="sm" className="text-blue-800">
                        Attendance records are view-only. Employees submit attendance through the Employee Portal.
                    </Text>
                </div>

                {/* Error state */}
                {error && (
                    <div className="p-4 mb-4 bg-danger-light border border-danger/20 rounded-lg text-danger text-sm">
                        {error.message || 'Failed to load attendance'}
                    </div>
                )}

                {/* Table */}
                <AttendanceTable
                    attendance={attendance}
                    isLoading={isLoading}
                    sortBy={params.sortBy}
                    sortOrder={params.sortOrder}
                    onSort={handleSort}
                />

                {/* Pagination */}
                {meta.total > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                        <Pagination
                            meta={meta}
                            onPageChange={handlePageChange}
                            onLimitChange={(limit) => setParams(prev => ({ ...prev, limit, page: 1 }))}
                        />
                    </div>
                )}
            </Card>
        </DashboardLayout>
    );
};
