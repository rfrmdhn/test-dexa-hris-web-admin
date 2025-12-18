/**
 * App Component
 * Main application with routing configuration
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/routes';

// Auth
import { LoginPage } from '@/features/auth/pages';

// Dashboard
import { DashboardPage } from '@/features/dashboard/pages';

// Employees
import {
  EmployeeListPage,
  EmployeeCreatePage,
  EmployeeEditPage,
} from '@/features/employees/pages';

// Attendance
import { AttendancePage } from '@/features/attendance/pages';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes */}
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

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
