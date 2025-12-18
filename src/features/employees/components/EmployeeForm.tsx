/**
 * EmployeeForm Component
 * Form for creating and editing employees
 */

import React, { useState, useEffect } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Select, type SelectOption } from '@/components/molecules/Select';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Label } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto, UserRole } from '@/libs/types';

// Base props for both create and edit modes
interface BaseFormProps {
    onCancel: () => void;
    isLoading?: boolean;
    error?: string | null;
}

// Create mode - no employee, requires CreateEmployeeDto
interface CreateFormProps extends BaseFormProps {
    mode: 'create';
    employee?: never;
    onSubmit: (data: CreateEmployeeDto) => void;
}

// Edit mode - has employee, uses UpdateEmployeeDto
interface EditFormProps extends BaseFormProps {
    mode: 'edit';
    employee: Employee;
    onSubmit: (data: UpdateEmployeeDto) => void;
}

type EmployeeFormProps = CreateFormProps | EditFormProps;

const roleOptions: SelectOption[] = [
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'ADMIN', label: 'Admin' },
];

interface FormErrors {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
    const {
        onCancel,
        isLoading = false,
        error,
    } = props;

    const isEditing = props.mode === 'edit';
    const employee = isEditing ? props.employee : undefined;

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        role: 'EMPLOYEE' as UserRole,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (employee) {
            setFormData({
                email: employee.email,
                name: employee.name,
                password: '',
                role: employee.role,
            });
        }
    }, [employee]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.length > 255) {
            newErrors.name = 'Name must be less than 255 characters';
        }

        // Password validation (required only for new employees)
        if (!isEditing && !formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password && formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        if (props.mode === 'edit') {
            // Only send changed fields for update
            const updateData: UpdateEmployeeDto = {};
            if (formData.email !== props.employee.email) updateData.email = formData.email;
            if (formData.name !== props.employee.name) updateData.name = formData.name;
            if (formData.role !== props.employee.role) updateData.role = formData.role;
            if (formData.password) updateData.password = formData.password;

            props.onSubmit(updateData);
        } else {
            props.onSubmit({
                email: formData.email,
                name: formData.name,
                password: formData.password,
                role: formData.role,
            });
        }
    };

    const handleChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Card className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-danger-light border border-danger/20 rounded-lg flex items-start gap-3">
                        <Icon name="error" className="text-danger flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-danger">{error}</span>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange('name')}
                        error={errors.name}
                        required
                        leftIcon={<Icon name="person" size="sm" />}
                    />

                    <FormField
                        label="Email"
                        type="email"
                        placeholder="john.doe@company.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        required
                        leftIcon={<Icon name="mail" size="sm" />}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label={isEditing ? 'New Password (optional)' : 'Password'}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={isEditing ? 'Leave empty to keep current' : 'Min 8 characters'}
                        value={formData.password}
                        onChange={handleChange('password')}
                        error={errors.password}
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
                    />

                    <div>
                        <Label htmlFor="role" required>
                            Role
                        </Label>
                        <Select
                            id="role"
                            value={formData.role}
                            onChange={handleChange('role')}
                            options={roleOptions}
                            error={!!errors.role}
                        />
                        {errors.role && (
                            <p className="text-sm text-danger mt-1">{errors.role}</p>
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
