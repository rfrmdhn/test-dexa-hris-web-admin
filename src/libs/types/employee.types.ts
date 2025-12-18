/**
 * Employee Types
 * Types for employee CRUD operations
 */

import type { UserRole, UserWithTimestamps, PaginationParams } from './api.types';

export interface Employee extends UserWithTimestamps { }

export interface EmployeeQueryParams extends PaginationParams {
    search?: string;
    role?: UserRole;
}

export interface CreateEmployeeDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}

export interface UpdateEmployeeDto {
    email?: string;
    password?: string;
    name?: string;
    role?: UserRole;
}
