/**
 * Sidebar Organism
 * Navigation sidebar with links and user section
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Typography';
import { Avatar } from '@/components/molecules/Avatar';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

interface NavItem {
    label: string;
    icon: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Employees', icon: 'group', path: '/employees' },
    { label: 'Attendance', icon: 'schedule', path: '/attendance' },
];

export const Sidebar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-[260px] bg-sidebar-bg flex flex-col z-40">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="admin_panel_settings" size="sm" className="text-white" />
                    </div>
                    <Text className="text-white font-semibold text-lg">HRIS Admin</Text>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive =
                            item.path === '/dashboard'
                                ? location.pathname === '/dashboard'
                                : location.pathname.startsWith(item.path);

                        return (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                                        isActive
                                            ? 'bg-primary text-white'
                                            : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active'
                                    )}
                                >
                                    <Icon name={item.icon} size="sm" />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-hover">
                    <Avatar name={user?.name || 'Admin'} size="sm" />
                    <div className="flex-1 min-w-0">
                        <Text size="sm" className="text-white font-medium truncate">
                            {user?.name || 'Admin'}
                        </Text>
                        <Text size="xs" className="text-sidebar-text truncate">
                            {user?.email || 'admin@company.com'}
                        </Text>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-1.5 text-sidebar-text hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Logout"
                    >
                        <Icon name="logout" size="sm" />
                    </button>
                </div>
            </div>
        </aside>
    );
};
