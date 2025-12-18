import type { PaginationParams, User } from './api.types';

export interface Attendance {
    id: string;
    userId: string;
    user: Pick<User, 'id' | 'email' | 'name'>;
    checkInTime: string;
    photoUrl: string;
    checkOutTime: string | null;
}

export interface AttendanceQueryParams extends PaginationParams {
    userId?: string;
    startDate?: string;
    endDate?: string;
}
