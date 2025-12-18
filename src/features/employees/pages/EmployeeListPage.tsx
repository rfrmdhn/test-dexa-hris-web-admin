import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Select } from '@/components/molecules/Select';
import { Pagination } from '@/components/molecules/Pagination';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { EmployeeTable } from '@/features/employees/components';
import { useEmployees, useDeleteEmployee } from '@/features/employees/hooks';
import { useTableParams } from '@/libs/hooks';
import type { Employee, EmployeeQueryParams } from '@/libs/types';
import { ROLE_FILTER_OPTIONS } from '@/libs/constants';

export const EmployeeListPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        params,
        handleSearch,
        handleSort,
        handlePageChange,
        handleLimitChange,
        setFilter,
    } = useTableParams<EmployeeQueryParams>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

    const { data, isLoading, error } = useEmployees(params);

    const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee({
        onSuccess: () => setDeleteTarget(null),
        onError: (err) => {
            console.error('Delete failed:', err);
            setDeleteTarget(null);
        },
    });

    const handleRoleFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter('role', e.target.value);
    }, [setFilter]);

    const handleDeleteConfirm = useCallback(() => {
        if (deleteTarget) {
            deleteEmployee(deleteTarget.id);
        }
    }, [deleteTarget, deleteEmployee]);

    const employees = useMemo(() => data?.items ?? [], [data]);
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
            title="Employees"
            subtitle={`${meta.total} total employees`}
            actions={
                <Button onClick={() => navigate('/employees/create')} leftIcon={<Icon name="add" size="sm" />}>
                    Add Employee
                </Button>
            }
        >
            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <SearchBar
                        value={params.search}
                        onChange={handleSearch}
                        placeholder="Search by name or email..."
                        className="flex-1 max-w-md"
                    />
                    <Select
                        value={params.role ?? ''}
                        onChange={handleRoleFilter}
                        options={ROLE_FILTER_OPTIONS}
                        className="w-40"
                    />
                </div>

                {error && (
                    <div className="p-4 mb-4 bg-danger-light border border-danger/20 rounded-lg text-danger text-sm">
                        {error.message || 'Failed to load employees'}
                    </div>
                )}

                <EmployeeTable
                    employees={employees}
                    isLoading={isLoading}
                    sortBy={params.sortBy}
                    sortOrder={params.sortOrder}
                    onSort={handleSort}
                    onDelete={setDeleteTarget}
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

            <ConfirmDialog
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                title="Delete Employee"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This will also delete all their attendance records. This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </DashboardLayout>
    );
};
