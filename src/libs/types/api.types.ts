/**
 * API Response Types
 * Standardized API response format matching backend contract
 */

// Standard API Response wrapper
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

// Error response structure
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: false;
  error?: {
    code: string;
    details: string[];
  };
}

// Pagination metadata (matching backend)
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Paginated data wrapper (Client side usage)
export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

// Backend Response format for paginated data
export interface PaginatedApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

// Common query parameters for paginated endpoints
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// User role enum
export type UserRole = 'ADMIN' | 'EMPLOYEE';

// Base user type (for auth response and relations)
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// User with timestamps
export interface UserWithTimestamps extends User {
  createdAt: string;
  updatedAt: string;
}

// Login request payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Login response data
export interface LoginResponseData {
  access_token: string;
  user: User;
}

// Attendance record
export interface Attendance {
  id: string;
  userId: string;
  checkInTime: string;
  checkOutTime?: string;
  photoUrl?: string;
  user: User;
}

// Attendance query params
export interface AttendanceQueryParams extends PaginationParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
}
