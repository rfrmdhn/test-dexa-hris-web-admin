import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Typography';
import { EmployeeForm } from '@/features/employees/components';
import { useEmployee, useUpdateEmployee } from '@/features/employees/hooks';
import type { UpdateEmployeeDto } from '@/libs/types';

export const EmployeeEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);

    const { data: employee, isLoading: isFetching, error: fetchError } = useEmployee(id);

    const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee({
        onError: (err) => {
            setError(err.message || 'Failed to update employee');
        },
    });

    const handleSubmit = (data: UpdateEmployeeDto) => {
        if (!id) return;
        setError(null);
        updateEmployee({ id, data });
    };

    if (isFetching) {
        return (
            <DashboardLayout title="Edit Employee">
                <div className="flex items-center justify-center py-16">
                    <Spinner size="lg" className="text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    if (fetchError || !employee) {
        return (
            <DashboardLayout title="Edit Employee">
                <div className="text-center py-16">
                    <Icon name="error" size="xl" className="text-danger mb-4" />
                    <Text className="text-danger mb-4">
                        {fetchError?.message || 'Employee not found'}
                    </Text>
                    <Button onClick={() => navigate('/employees')}>
                        Back to Employees
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Edit Employee"
            subtitle={`Editing ${employee.name}`}
            actions={
                <Button variant="ghost" onClick={() => navigate('/employees')}>
                    <Icon name="arrow_back" size="sm" className="mr-2" />
                    Back to List
                </Button>
            }
        >
            <EmployeeForm
                mode="edit"
                employee={employee}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/employees')}
                isLoading={isUpdating}
                error={error}
            />
        </DashboardLayout>
    );
};
