import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';
import { Label } from '@/components/atoms/Typography';
import { Select } from '@/components/molecules/Select';
import { Pagination } from '@/components/molecules/Pagination';
import { AttendanceTable } from '@/features/attendance/components';
import { useAttendance, useAttendanceFilters } from '@/features/attendance/hooks';

export const AttendancePage: React.FC = () => {
    const {
        params,
        employeeOptions,
        handleSort,
        handlePageChange,
        handleLimitChange,
        handleEmployeeFilter,
        handleStartDateChange,
        handleEndDateChange,
    } = useAttendanceFilters();

    const { data, isLoading, error } = useAttendance(params);

    const attendance = useMemo(() => data?.items ?? [], [data]);
    const meta = useMemo(
        () =>
            data?.meta ?? {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 1,
            },
        [data]
    );

    return (
        <DashboardLayout
            title="Attendance Monitoring"
            subtitle={`${meta.total} records`}
        >
            <Card>
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

                {error && (
                    <div className="p-4 mb-4 bg-danger-light border border-danger/20 rounded-lg text-danger text-sm">
                        {error.message || 'Failed to load attendance'}
                    </div>
                )}

                <AttendanceTable
                    attendance={attendance}
                    isLoading={isLoading}
                    sortBy={params.sortBy}
                    sortOrder={params.sortOrder}
                    onSort={handleSort}
                />

                {meta.total > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                        <Pagination
                            meta={meta}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}
                        />
                    </div>
                )}
            </Card>
        </DashboardLayout>
    );
};
