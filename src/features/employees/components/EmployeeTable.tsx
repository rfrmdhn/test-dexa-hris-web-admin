/**
 * EmployeeTable Component
 * Table displaying employees with actions
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, type Column } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/molecules/Avatar';
import { formatDateTime } from '@/libs/utils';
import type { Employee } from '@/libs/types';

interface EmployeeTableProps {
    employees: Employee[];
    isLoading?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSort?: (key: string) => void;
    onDelete?: (employee: Employee) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
    employees,
    isLoading = false,
    sortBy,
    sortOrder,
    onSort,
    onDelete,
}) => {
    const navigate = useNavigate();

    const columns: Column<Employee>[] = [
        {
            key: 'name',
            header: 'Employee',
            sortable: true,
            render: (employee) => (
                <div className="flex items-center gap-3">
                    <Avatar name={employee.name} size="sm" />
                    <div>
                        <div className="font-medium text-text-primary">{employee.name}</div>
                        <div className="text-sm text-text-muted">{employee.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            header: 'Role',
            width: '120px',
            render: (employee) => (
                <Badge variant={employee.role === 'ADMIN' ? 'primary' : 'default'}>
                    {employee.role}
                </Badge>
            ),
        },
        {
            key: 'createdAt',
            header: 'Created',
            sortable: true,
            width: '180px',
            render: (employee) => (
                <span className="text-text-secondary">
                    {formatDateTime(employee.createdAt)}
                </span>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            width: '120px',
            className: 'text-right',
            render: (employee) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/employees/${employee.id}/edit`)}
                        title="Edit employee"
                    >
                        <Icon name="edit" size="sm" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete?.(employee)}
                        title="Delete employee"
                        className="text-danger hover:bg-danger-light"
                    >
                        <Icon name="delete" size="sm" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={employees}
            keyExtractor={(employee) => employee.id}
            isLoading={isLoading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
            emptyIcon="group"
            emptyTitle="No employees found"
            emptyDescription="Start by adding your first employee"
        />
    );
};
