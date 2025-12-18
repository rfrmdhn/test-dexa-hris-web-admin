import { z } from 'zod';

export const employeeSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must be less than 255 characters'),
    email: z.string().email('Please enter a valid email'),
    role: z.enum(['ADMIN', 'EMPLOYEE']),
    password: z.string().optional().or(z.literal('')),
});

export const createEmployeeSchema = employeeSchema.extend({
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updateEmployeeSchema = employeeSchema.extend({
    password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
