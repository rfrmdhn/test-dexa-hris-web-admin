/**
 * Employee Types
 * Types for employee CRUD operations
 */

import type { UserRole, UserWithTimestamps, PaginationParams } from './api.types';

// Employee entity (same as UserWithTimestamps for this API)
export interface Employee extends UserWithTimestamps { }

// Query parameters for employee list
export interface EmployeeQueryParams extends PaginationParams {
    search?: string;
    role?: UserRole;
}

// Create employee DTO
export interface CreateEmployeeDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}

// Update employee DTO (all fields optional)
export interface UpdateEmployeeDto {
    email?: string;
    password?: string;
    name?: string;
    role?: UserRole;
}
