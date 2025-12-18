import { ATTENDANCE_SERVICE_URL } from '@/libs/api/client';

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
