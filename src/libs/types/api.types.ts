export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: false;
  error?: {
    code: string;
    details: string[];
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginatedApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface UserWithTimestamps extends User {
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  user: User;
}
