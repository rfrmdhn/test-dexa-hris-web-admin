/**
 * AttendanceTable Component
 * Table displaying attendance records (view-only)
 */

import React, { useState } from 'react';
import { DataTable, type Column } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/molecules/Avatar';
import { formatDateTime, formatTime } from '@/libs/utils';
import type { Attendance } from '@/libs/types';

interface AttendanceTableProps {
    attendance: Attendance[];
    isLoading?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSort?: (key: string) => void;
}

// Simple photo preview modal
const PhotoModal: React.FC<{ photoUrl: string | null; onClose: () => void }> = ({
    photoUrl,
    onClose,
}) => {
    if (!photoUrl) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-2xl max-h-[80vh]">
                <img
                    src={photoUrl}
                    alt="Check-in photo"
                    className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 p-2 bg-surface rounded-full shadow-lg hover:bg-secondary-light transition-colors"
                >
                    <Icon name="close" size="sm" />
                </button>
            </div>
        </div>
    );
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
    attendance,
    isLoading = false,
    sortBy,
    sortOrder,
    onSort,
}) => {
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

    const columns: Column<Attendance>[] = [
        {
            key: 'user',
            header: 'Employee',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Avatar name={item.user.name} size="sm" />
                    <div>
                        <div className="font-medium text-text-primary">{item.user.name}</div>
                        <div className="text-sm text-text-muted">{item.user.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'checkInTime',
            header: 'Date',
            sortable: true,
            width: '160px',
            render: (item) => (
                <span className="text-text-secondary">
                    {formatDateTime(item.checkInTime).split(' ').slice(0, 3).join(' ')}
                </span>
            ),
        },
        {
            key: 'checkIn',
            header: 'Check In',
            width: '100px',
            render: (item) => (
                <Badge variant="success" size="sm">
                    {formatTime(item.checkInTime)}
                </Badge>
            ),
        },
        {
            key: 'checkOut',
            header: 'Check Out',
            width: '100px',
            render: (item) =>
                item.checkOutTime ? (
                    <Badge variant="info" size="sm">
                        {formatTime(item.checkOutTime)}
                    </Badge>
                ) : (
                    <Badge variant="warning" size="sm">
                        Active
                    </Badge>
                ),
        },
        {
            key: 'photo',
            header: 'Photo',
            width: '80px',
            className: 'text-center',
            render: (item) =>
                item.photoUrl ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewPhoto(item.photoUrl)}
                        title="View photo"
                    >
                        <Icon name="photo_camera" size="sm" className="text-primary" />
                    </Button>
                ) : (
                    <span className="text-text-muted">-</span>
                ),
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={attendance}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
                emptyIcon="schedule"
                emptyTitle="No attendance records"
                emptyDescription="Attendance records will appear here when employees check in"
            />

            <PhotoModal photoUrl={previewPhoto} onClose={() => setPreviewPhoto(null)} />
        </>
    );
};
