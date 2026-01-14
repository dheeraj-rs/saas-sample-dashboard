import type { LoginCredentials, AuthResponse, LogoutResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, UpdateProfileRequest, UpdateProfileResponse, ChangePasswordRequest, ChangePasswordResponse } from '@/types/auth.types';
import { authenticateUser, currentUser } from '@/data/users';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = authenticateUser(credentials.email, credentials.password);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const mockResponse: AuthResponse = {
        status: "success",
        data: {
            user: {
                id: user.user_id || user.id || "user-1",
                name: user.name,
                email: user.email,
                avatar: user.avatar || "/avatars/user.jpg"
            },
            token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiJHt1c2VyLnVzZXJfaWR9IiwiZXhwIjoke3VzZXIuZXhwfSwiaWF0Ijoke3VzZXIuaWF0fX0.mock_token_${Date.now()}`
        }
    };
    return mockResponse;
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

export async function forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (request.email === "error@gmail.com") {
        throw new Error("We can't find a user with that e-mail address.");
    }
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

export async function updateProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    // MOCK RESPONSE
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse: UpdateProfileResponse = {
        status: "success",
        data: {
            user: {
                id: currentUser.user_id || currentUser.id || "user-1",
                name: request.name,
                email: currentUser.email,
                avatar: currentUser.avatar || "/avatars/user.jpg"
            },
            message: "Profile updated successfully."
        }
    };
    return mockResponse;
}

export async function changePassword(_request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    // MOCK RESPONSE
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse: ChangePasswordResponse = {
        status: "success",
        data: {
            message: "Password changed successfully."
        }
    };
    return mockResponse;
}
