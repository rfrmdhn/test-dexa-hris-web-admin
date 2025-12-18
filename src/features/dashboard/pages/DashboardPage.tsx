/**
 * DashboardPage
 * Main dashboard with statistics and quick links
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Heading, Text } from '@/components/atoms/Typography';
import { Spinner } from '@/components/atoms/Spinner';
import { useEmployees } from '@/features/employees/hooks';
import { useAttendance } from '@/features/attendance/hooks';
import { getTodayISO } from '@/libs/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    iconColor: string;
    iconBg: string;
    loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    iconColor,
    iconBg,
    loading,
}) => (
    <Card className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon name={icon} size="lg" className={iconColor} />
        </div>
        <div>
            <Text size="sm" variant="muted" className="mb-1">
                {title}
            </Text>
            {loading ? (
                <Spinner size="sm" />
            ) : (
                <Heading as="h3" className="text-2xl">
                    {value}
                </Heading>
            )}
        </div>
    </Card>
);

interface QuickLinkProps {
    title: string;
    description: string;
    icon: string;
    path: string;
}

const QuickLinkCard: React.FC<QuickLinkProps> = ({
    title,
    description,
    icon,
    path,
}) => {
    const navigate = useNavigate();

    return (
        <Card
            variant="outline"
            className="cursor-pointer hover:border-primary hover:shadow-md transition-all group"
            onClick={() => navigate(path)}
        >
            <div className="flex items-start gap-4">
                <div className="p-2 bg-primary-light rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon name={icon} className="text-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                    <Heading as="h4" className="mb-1 group-hover:text-primary transition-colors">
                        {title}
                    </Heading>
                    <Text size="sm" variant="muted">
                        {description}
                    </Text>
                </div>
                <Icon
                    name="arrow_forward"
                    className="text-text-muted group-hover:text-primary transition-colors"
                />
            </div>
        </Card>
    );
};

export const DashboardPage: React.FC = () => {
    const today = getTodayISO();

    // Fetch stats
    const { data: employeesData, isLoading: loadingEmployees } = useEmployees({ limit: 1 });
    const { data: attendanceData, isLoading: loadingAttendance } = useAttendance({
        limit: 1,
        startDate: today,
        endDate: today,
    });

    const totalEmployees = employeesData?.meta.totalItems ?? 0;
    const todayAttendance = attendanceData?.meta.totalItems ?? 0;

    return (
        <DashboardLayout
            title="Dashboard"
            subtitle="Welcome back to HRIS Admin"
        >
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon="group"
                    iconColor="text-primary"
                    iconBg="bg-primary-light"
                    loading={loadingEmployees}
                />
                <StatCard
                    title="Today's Check-ins"
                    value={todayAttendance}
                    icon="login"
                    iconColor="text-success"
                    iconBg="bg-success-light"
                    loading={loadingAttendance}
                />
                <StatCard
                    title="Admin Users"
                    value="-"
                    icon="admin_panel_settings"
                    iconColor="text-warning"
                    iconBg="bg-warning-light"
                />
                <StatCard
                    title="Active Today"
                    value="-"
                    icon="trending_up"
                    iconColor="text-info"
                    iconBg="bg-info-light"
                />
            </div>

            {/* Quick Links */}
            <div className="mb-6">
                <Heading as="h3" className="mb-4">
                    Quick Actions
                </Heading>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <QuickLinkCard
                        title="Manage Employees"
                        description="View, add, edit, or remove employees"
                        icon="group"
                        path="/employees"
                    />
                    <QuickLinkCard
                        title="View Attendance"
                        description="Monitor employee check-ins and check-outs"
                        icon="schedule"
                        path="/attendance"
                    />
                    <QuickLinkCard
                        title="Add Employee"
                        description="Register a new employee in the system"
                        icon="person_add"
                        path="/employees/create"
                    />
                </div>
            </div>

            {/* Info Card */}
            <Card variant="outline" className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-xl">
                        <Icon name="info" className="text-white" />
                    </div>
                    <div className="flex-1">
                        <Heading as="h4" className="mb-1">
                            HRIS Admin Panel
                        </Heading>
                        <Text size="sm" variant="muted">
                            This dashboard allows you to manage employees and monitor attendance.
                            Employees submit their attendance through the Employee Portal app.
                        </Text>
                    </div>
                    <Button variant="ghost" onClick={() => window.open('https://github.com', '_blank')}>
                        Learn More
                    </Button>
                </div>
            </Card>
        </DashboardLayout>
    );
};
