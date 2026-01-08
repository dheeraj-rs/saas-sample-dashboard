export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: string;
    data: {
        user: User;
        token: string;
    };
}

export interface LogoutResponse {
    status: string;
    data: {
        message: string;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    status: string;
    data: {
        message: string;
    };
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordResponse {
    status: string;
    data: {
        message: string;
    };
}

