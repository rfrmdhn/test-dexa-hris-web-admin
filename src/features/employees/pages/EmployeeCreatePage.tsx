import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { EmployeeForm } from '@/features/employees/components';
import { useCreateEmployee } from '@/features/employees/hooks';
import { useToastStore } from '@/stores/useToastStore';
import type { CreateEmployeeDto } from '@/libs/types';

export const EmployeeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { addToast } = useToastStore();

    const { mutate: createEmployee, isPending } = useCreateEmployee({
        onSuccess: () => {
            addToast({
                type: 'success',
                title: 'Employee Created',
                message: 'New employee has been successfully added.',
            });
            navigate('/employees');
        },
        onError: (err) => {
            setError(err.message || 'Failed to create employee');
        },
    });

    const handleSubmit = (data: CreateEmployeeDto) => {
        setError(null);
        createEmployee(data as CreateEmployeeDto);
    };

    return (
        <DashboardLayout
            title="Create Employee"
            subtitle="Add a new employee to the system"
            actions={
                <Button variant="ghost" onClick={() => navigate('/employees')}>
                    <Icon name="arrow_back" size="sm" className="mr-2" />
                    Back to List
                </Button>
            }
        >
            <EmployeeForm
                mode="create"
                onSubmit={handleSubmit}
                onCancel={() => navigate('/employees')}
                isLoading={isPending}
                error={error}
            />
        </DashboardLayout>
    );
};
