/**
 * Date utilities
 * Date formatting and manipulation using date-fns
 */

import { format, parseISO, formatDistanceToNow, isValid } from 'date-fns';

/**
 * Format ISO date string to readable format
 * @param dateString - ISO 8601 date string
 * @param formatStr - date-fns format string (default: 'MMM dd, yyyy')
 */
export function formatDate(dateString: string, formatStr = 'MMM dd, yyyy'): string {
    try {
        const date = parseISO(dateString);
        if (!isValid(date)) return '-';
        return format(date, formatStr);
    } catch {
        return '-';
    }
}

/**
 * Format ISO date string to date and time
 * @param dateString - ISO 8601 date string
 */
export function formatDateTime(dateString: string): string {
    return formatDate(dateString, 'MMM dd, yyyy HH:mm');
}

/**
 * Format ISO date string to time only
 * @param dateString - ISO 8601 date string
 */
export function formatTime(dateString: string): string {
    return formatDate(dateString, 'HH:mm');
}

/**
 * Get relative time from now
 * @param dateString - ISO 8601 date string
 */
export function formatRelativeTime(dateString: string): string {
    try {
        const date = parseISO(dateString);
        if (!isValid(date)) return '-';
        return formatDistanceToNow(date, { addSuffix: true });
    } catch {
        return '-';
    }
}

/**
 * Format date for input[type="date"]
 * @param dateString - ISO 8601 date string
 */
export function formatDateForInput(dateString: string): string {
    return formatDate(dateString, 'yyyy-MM-dd');
}

/**
 * Get today's date in ISO format (date only)
 */
export function getTodayISO(): string {
    return format(new Date(), 'yyyy-MM-dd');
}
