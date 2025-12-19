import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEmployeeSchema, updateEmployeeSchema } from '@/libs/schemas/employee.schema';
import { FormField } from '@/components/molecules/FormField';
import { Select } from '@/components/molecules/Select';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Label } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '@/libs/types';
import { USER_ROLE_OPTIONS } from '@/libs/constants';

interface BaseFormProps {
    onCancel: () => void;
    isLoading?: boolean;
    error?: string | null;
}

interface CreateFormProps extends BaseFormProps {
    mode: 'create';
    employee?: never;
    onSubmit: (data: CreateEmployeeDto) => void;
}

interface EditFormProps extends BaseFormProps {
    mode: 'edit';
    employee: Employee;
    onSubmit: (data: UpdateEmployeeDto) => void;
}

type EmployeeFormProps = CreateFormProps | EditFormProps;

export const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
    const { onCancel, isLoading = false, error: serverError } = props;
    const isEditing = props.mode === 'edit';
    const [showPassword, setShowPassword] = useState(false);

    const schema = isEditing ? updateEmployeeSchema : createEmployeeSchema;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            name: '',
            role: 'EMPLOYEE',
            password: '',
        },
    });

    useEffect(() => {
        if (isEditing && props.employee) {
            reset({
                email: props.employee.email,
                name: props.employee.name,
                role: props.employee.role,
                password: '',
            });
        }
    }, [isEditing, props.employee, reset]);

    const onSubmit = (data: any) => {
        if (isEditing) {
            const updateData: UpdateEmployeeDto = {
                email: data.email,
                name: data.name,
                role: data.role,
            };
            if (data.password) updateData.password = data.password;

            props.onSubmit(updateData);
        } else {
            props.onSubmit(data as CreateEmployeeDto);
        }
    };

    return (
        <Card className="max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {serverError && (
                    <div className="p-4 bg-danger-light border border-danger/20 rounded-lg flex items-start gap-3">
                        <Icon name="error" className="text-danger flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-danger">{serverError}</span>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.name?.message as string}
                        required
                        leftIcon={<Icon name="person" size="sm" />}
                        {...register('name')}
                    />

                    <FormField
                        label="Email"
                        type="email"
                        placeholder="john.doe@company.com"
                        error={errors.email?.message as string}
                        required
                        leftIcon={<Icon name="mail" size="sm" />}
                        {...register('email')}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label={isEditing ? 'New Password (optional)' : 'Password'}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={isEditing ? 'Leave empty to keep current' : 'Min 8 characters'}
                        error={errors.password?.message as string}
                        required={!isEditing}
                        leftIcon={<Icon name="lock" size="sm" />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-0.5 hover:bg-secondary-light rounded transition-colors"
                                tabIndex={-1}
                            >
                                <Icon
                                    name={showPassword ? 'visibility_off' : 'visibility'}
                                    size="sm"
                                    className="text-text-muted"
                                />
                            </button>
                        }
                        {...register('password')}
                    />

                    <div>
                        <Label htmlFor="role" required>
                            Role
                        </Label>
                        <Select
                            id="role"
                            options={USER_ROLE_OPTIONS}
                            error={!!errors.role}
                            {...register('role')}
                        />
                        {errors.role && (
                            <p className="text-sm text-danger mt-1">{errors.role.message as string}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditing ? 'Update Employee' : 'Create Employee'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
