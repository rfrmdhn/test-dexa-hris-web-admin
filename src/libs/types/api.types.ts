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

// Pagination metadata
export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

// Paginated data wrapper
export interface PaginatedData<T> {
  items: T[];
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
