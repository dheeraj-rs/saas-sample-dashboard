// import { getApiUrl, getAuthHeaders, handleApiError } from '@/lib/api.utils';
import type { LoginCredentials, AuthResponse, LogoutResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from '@/types/auth.types';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    // MOCK RESPONSE FOR TESTING
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse: AuthResponse = {
        status: "success",
        data: {
            user: {
                id: "018f2000-a111-b222-c333-000000000027",
                name: "Joshua Hill",
                email: credentials.email,
                avatar: "/avatars/user.jpg"
            },
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMDE4ZjIwMDAtYTExMS1iMjIyLWMzMzMtMDAwMDAwMDAwMDI3In0.mock_token"
        }
    };

    return mockResponse;

    /* REAL API CALL 
    try {
        const response = await fetch(getApiUrl('/auth/login'), {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                data: {
                    email: credentials.email,
                    password: credentials.password,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Login failed. Please check your credentials.');
        }

        const data: AuthResponse = await response.json();

        if (data.status !== 'success') {
            throw new Error('Login failed. Please try again.');
        }

        return data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
    */
}

export async function logout(_token: string): Promise<LogoutResponse> {
    // MOCK RESPONSE FOR TESTING
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockResponse: LogoutResponse = {
        status: "success",
        data: {
            message: "Logged out successfully"
        }
    };
    return mockResponse;

    /* REAL API CALL 
    try {
        const response = await fetch(getApiUrl('/auth/logout'), {
            method: 'POST',
            headers: getAuthHeaders(token),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Logout failed. Please try again.');
        }

        const data: LogoutResponse = await response.json();

        if (data.status !== 'success') {
            throw new Error('Logout failed. Please try again.');
        }

        return data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
    */
}

export async function forgotPassword(_request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    // MOCK RESPONSE FOR TESTING
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse: ForgotPasswordResponse = {
        status: "success",
        data: {
            message: "We have emailed your password reset link."
        }
    };
    return mockResponse;

    /* REAL API CALL
    try {
        const response = await fetch(getApiUrl('/auth/forgot-password'), {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                data: {
                    email: request.email,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to send reset link. Please try again.');
        }

        const data: ForgotPasswordResponse = await response.json();

        if (data.status !== 'success') {
            throw new Error('Failed to send reset link. Please try again.');
        }

        return data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
    */
}

export async function resetPassword(_request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    // MOCK RESPONSE FOR TESTING
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse: ResetPasswordResponse = {
        status: "success",
        data: {
            message: "Your password has been reset."
        }
    };
    return mockResponse;

    /* REAL API CALL
    try {
        const response = await fetch(getApiUrl('/auth/reset-password'), {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                data: {
                    token: request.token,
                    password: request.password,
                    password_confirmation: request.password_confirmation,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to reset password. Please try again.');
        }

        const data: ResetPasswordResponse = await response.json();

        if (data.status !== 'success') {
            throw new Error('Failed to reset password. Please try again.');
        }

        return data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
    */
}
