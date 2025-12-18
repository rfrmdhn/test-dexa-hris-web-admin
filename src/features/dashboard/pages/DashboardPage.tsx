import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Heading, Text } from '@/components/atoms/Typography';

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
    return (
        <DashboardLayout
            title="Dashboard"
            subtitle="Welcome back to HRIS Admin"
        >
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
