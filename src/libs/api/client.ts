import axios from 'axios';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const AUTH_SERVICE_URL = import.meta.env.AUTH_SERVICE_URL;
export const ATTENDANCE_SERVICE_URL = import.meta.env.ATTENDANCE_SERVICE_URL;

const apiClient = axios.create({
    baseURL: AUTH_SERVICE_URL,
});

export const attendanceApiClient = axios.create({
    baseURL: ATTENDANCE_SERVICE_URL,
});

const setupInterceptors = (instance: typeof apiClient) => {
    instance.interceptors.request.use((config) => {
        const token = useAuthStore.getState().token;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    instance.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response?.status === 401) {
                useAuthStore.getState().logout(); // Auto logout
            }
            return Promise.reject(err);
        }
    );
};

setupInterceptors(apiClient);
setupInterceptors(attendanceApiClient);

export default apiClient;
