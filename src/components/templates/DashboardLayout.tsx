/**
 * DashboardLayout Template
 * Layout with sidebar and content area for authenticated pages
 */

import React from 'react';
import { cn } from '@/libs/utils';
import { Sidebar } from '@/components/organisms/Sidebar';
import { TopBar, type TopBarProps } from '@/components/organisms/TopBar';

export interface DashboardLayoutProps extends Pick<TopBarProps, 'title' | 'subtitle' | 'actions'> {
    children: React.ReactNode;
    className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    title,
    subtitle,
    actions,
    children,
    className,
}) => {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <main className="ml-[260px] min-h-screen flex flex-col">
                <TopBar title={title} subtitle={subtitle} actions={actions} />

                <div className={cn('flex-1 p-6', className)}>
                    {children}
                </div>
            </main>
        </div>
    );
};
