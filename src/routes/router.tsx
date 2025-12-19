import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '@/routes';
import { ToastContainer } from '@/components/molecules/Toast';
import { employeeListLoader, employeeDetailLoader, attendanceListLoader, loginLoader } from './loaders';

// Lazy load pages directly
const LoginPage = async () => {
    const { LoginPage } = await import('@/features/auth/pages');
    return { Component: LoginPage };
};
const DashboardPage = async () => {
    const { DashboardPage } = await import('@/features/dashboard/pages');
    return { Component: DashboardPage };
};
const EmployeeListPage = async () => {
    const { EmployeeListPage } = await import('@/features/employees/pages');
    return { Component: EmployeeListPage };
};
const EmployeeCreatePage = async () => {
    const { EmployeeCreatePage } = await import('@/features/employees/pages');
    return { Component: EmployeeCreatePage };
};
const EmployeeEditPage = async () => {
    const { EmployeeEditPage } = await import('@/features/employees/pages');
    return { Component: EmployeeEditPage };
};
const AttendancePage = async () => {
    const { AttendancePage } = await import('@/features/attendance/pages');
    return { Component: AttendancePage };
};

const RootLayout = () => (
    <>
        <Outlet />
        <ToastContainer />
    </>
);

const ProtectedLayout = () => (
    <ProtectedRoute>
        <Outlet />
    </ProtectedRoute>
);

export const createRouter = (queryClient: QueryClient) => createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/login',
                lazy: LoginPage,
                loader: loginLoader(),
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: '/',
                        element: <Navigate to="/dashboard" replace />,
                    },
                    {
                        path: '/dashboard',
                        index: true,
                        lazy: DashboardPage,
                    },
                    {
                        path: '/employees',
                        children: [
                            {
                                index: true,
                                lazy: EmployeeListPage,
                                loader: employeeListLoader(queryClient),
                            },
                            {
                                path: 'create',
                                lazy: EmployeeCreatePage,
                            },
                            {
                                path: ':id/edit',
                                lazy: EmployeeEditPage,
                                loader: employeeDetailLoader(queryClient),
                            },
                        ],
                    },
                    {
                        path: '/attendance',
                        children: [
                            {
                                index: true,
                                lazy: AttendancePage,
                                loader: attendanceListLoader(queryClient),
                            }
                        ]
                    },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/dashboard" replace />,
            }
        ]
    }
]);
