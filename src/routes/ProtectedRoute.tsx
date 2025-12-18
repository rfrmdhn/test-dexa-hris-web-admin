import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { Spinner } from '@/components/atoms/Spinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">Access Denied</h1>
                    <p className="text-text-muted mb-6">
                        You don't have permission to access the admin panel.
                    </p>
                    <button
                        onClick={() => useAuthStore.getState().logout()}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export const AuthLoadingScreen: React.FC = () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
            <Spinner size="lg" className="text-primary mb-4" />
            <p className="text-text-muted">Loading...</p>
        </div>
    </div>
);
