/**
 * Attendance Types
 * Types for attendance monitoring (view-only)
 */

import type { PaginationParams, User } from './api.types';

// Attendance entity with user relation
export interface Attendance {
    id: string;
    userId: string;
    user: Pick<User, 'id' | 'email' | 'name'>;
    checkInTime: string;
    photoUrl: string;
    checkOutTime: string | null;
}

// Query parameters for attendance list
export interface AttendanceQueryParams extends PaginationParams {
    userId?: string;
    startDate?: string; // ISO 8601 format
    endDate?: string;   // ISO 8601 format
}
