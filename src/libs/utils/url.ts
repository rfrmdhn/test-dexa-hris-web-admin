/**
 * URL Utilities
 */

/**
 * Get absolute URL for photo/file
 * Handles relative paths by prepending API origin
 */
export const getAbsolutePhotoUrl = (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith('http')) return path;

    // Get base URL from environment or default
    // We want the origin (http://localhost:3000) not the API path (http://localhost:3000/api)
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    let origin = apiUrl;
    try {
        origin = new URL(apiUrl).origin;
    } catch (e) {
        // Fallback if invalid URL
        origin = 'http://localhost:3000';
    }

    return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
};
