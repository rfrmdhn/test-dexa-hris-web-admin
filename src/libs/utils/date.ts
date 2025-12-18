import { format, parseISO, formatDistanceToNow, isValid } from 'date-fns';

export function formatDate(dateString: string, formatStr = 'MMM dd, yyyy'): string {
    try {
        const date = parseISO(dateString);
        if (!isValid(date)) return '-';
        return format(date, formatStr);
    } catch {
        return '-';
    }
}

export function formatDateTime(dateString: string): string {
    return formatDate(dateString, 'MMM dd, yyyy HH:mm');
}

export function formatTime(dateString: string): string {
    return formatDate(dateString, 'HH:mm');
}

export function formatRelativeTime(dateString: string): string {
    try {
        const date = parseISO(dateString);
        if (!isValid(date)) return '-';
        return formatDistanceToNow(date, { addSuffix: true });
    } catch {
        return '-';
    }
}

export function formatDateForInput(dateString: string): string {
    return formatDate(dateString, 'yyyy-MM-dd');
}

export function getTodayISO(): string {
    return format(new Date(), 'yyyy-MM-dd');
}
