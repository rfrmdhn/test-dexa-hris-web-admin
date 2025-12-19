import axios from 'axios';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';

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
            const { logout } = useAuthStore.getState();
            const { addToast } = useToastStore.getState();

            // Handle 401 Unauthorized
            if (err.response?.status === 401) {
                logout();
                addToast({
                    type: 'error',
                    title: 'Session Expired',
                    message: 'Please log in again.',
                });
            }
            else if (err.response?.status === 403) {
                addToast({
                    type: 'error',
                    title: 'Access Denied',
                    message: 'You do not have permission to perform this action.',
                });
            }
            else if (err.response?.status >= 500) {
                addToast({
                    type: 'error',
                    title: 'Server Error',
                    message: 'Something went wrong on our end. Please try again later.',
                });
            }

            return Promise.reject(err);
        }
    );
};

setupInterceptors(apiClient);
setupInterceptors(attendanceApiClient);

export default apiClient;
