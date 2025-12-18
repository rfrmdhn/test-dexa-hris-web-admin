import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/routes';

import { LoginPage } from '@/features/auth/pages';

import { DashboardPage } from '@/features/dashboard/pages';

import {
  EmployeeListPage,
  EmployeeCreatePage,
  EmployeeEditPage,
} from '@/features/employees/pages';

import { AttendancePage } from '@/features/attendance/pages';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeeListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/create"
        element={
          <ProtectedRoute>
            <EmployeeCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id/edit"
        element={
          <ProtectedRoute>
            <EmployeeEditPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
