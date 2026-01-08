/**
 * Get the API base URL from environment variables
 */
export function getApiBaseUrl(): string {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
}

/**
 * Construct full API URL from endpoint
 */
export function getApiUrl(endpoint: string): string {
    const baseUrl = getApiBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Get authorization headers with token
 */
export function getAuthHeaders(token?: string | null): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

/**
 * Handle API errors and return user-friendly messages
 */
export function handleApiError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An unexpected error occurred. Please try again.';
}
