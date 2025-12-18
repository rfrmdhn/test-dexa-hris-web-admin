/**
 * URL Utilities
 */

import { ATTENDANCE_SERVICE_URL } from '@/libs/api/client';

/**
 * Get absolute URL for photo/file
 * Handles relative paths by prepending Attendance Service origin
 * Files are stored and served by the attendance service
 */
export const getAbsolutePhotoUrl = (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith('http')) return path;

    let origin = ATTENDANCE_SERVICE_URL;
    try {
        origin = new URL(ATTENDANCE_SERVICE_URL).origin;
    } catch {
    }

    return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
};
