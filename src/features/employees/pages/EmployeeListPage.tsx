/**
 * EmployeeListPage
 * Page displaying list of employees with search, filter, pagination
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Select, type SelectOption } from '@/components/molecules/Select';
import { Pagination } from '@/components/molecules/Pagination';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { EmployeeTable } from '@/features/employees/components';
import { useEmployees, useDeleteEmployee } from '@/features/employees/hooks';
import type { Employee, EmployeeQueryParams, UserRole } from '@/libs/types';

const roleFilterOptions: SelectOption[] = [
    { value: '', label: 'All Roles' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
];

export const EmployeeListPage: React.FC = () => {
    const navigate = useNavigate();

    // Query params state
    const [params, setParams] = useState<EmployeeQueryParams>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    // Delete confirmation state
    const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

    // Fetch employees
    const { data, isLoading, error } = useEmployees(params);

    // Delete mutation
    const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee({
        onSuccess: () => setDeleteTarget(null),
        onError: (err) => {
            console.error('Delete failed:', err);
            setDeleteTarget(null);
        },
    });

    // Handlers
    const handleSearch = useCallback((search: string) => {
        setParams((prev) => ({ ...prev, search: search || undefined, page: 1 }));
    }, []);

    const handleRoleFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const role = e.target.value as UserRole | '';
        setParams((prev) => ({
            ...prev,
            role: role || undefined,
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

    const handleDeleteConfirm = useCallback(() => {
        if (deleteTarget) {
            deleteEmployee(deleteTarget.id);
        }
    }, [deleteTarget, deleteEmployee]);

    // Memoized values
    const employees = useMemo(() => data?.items ?? [], [data]);
    const meta = useMemo(
        () =>
            data?.meta ?? {
                totalItems: 0,
                itemCount: 0,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
            },
        [data]
    );

    return (
        <DashboardLayout
            title="Employees"
            subtitle={`${meta.totalItems} total employees`}
            actions={
                <Button onClick={() => navigate('/employees/create')} leftIcon={<Icon name="add" size="sm" />}>
                    Add Employee
                </Button>
            }
        >
            <Card>
                {/* Filters */}
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
                        options={roleFilterOptions}
                        className="w-40"
                    />
                </div>

                {/* Error state */}
                {error && (
                    <div className="p-4 mb-4 bg-danger-light border border-danger/20 rounded-lg text-danger text-sm">
                        {error.message || 'Failed to load employees'}
                    </div>
                )}

                {/* Table */}
                <EmployeeTable
                    employees={employees}
                    isLoading={isLoading}
                    sortBy={params.sortBy}
                    sortOrder={params.sortOrder}
                    onSort={handleSort}
                    onDelete={setDeleteTarget}
                />

                {/* Pagination */}
                {meta.totalPages > 1 && (
                    <div className="mt-6 pt-6 border-t border-border">
                        <Pagination meta={meta} onPageChange={handlePageChange} />
                    </div>
                )}
            </Card>

            {/* Delete confirmation */}
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
