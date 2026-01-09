import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginCredentials, User } from '@/types/auth.types';
import * as authService from '@/features/auth/services/auth.service';

interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User, token: string) => void;
    clearAuth: () => void;
    setError: (error: string | null) => void;
    setLoading: (isLoading: boolean) => void;
}

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authService.login(credentials);
                    const { user, token } = response.data;

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Login failed';
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: errorMessage,
                    });
                    throw error;
                }
            },

            logout: async () => {
                const { token } = get();
                set({ isLoading: true, error: null });

                try {
                    if (token) {
                        await authService.logout(token);
                    }
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        ...initialState,
                        isLoading: false,
                    });
                }
            },

            setUser: (user: User, token: string) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    error: null,
                });
            },

            clearAuth: () => {
                set(initialState);
            },

            setError: (error: string | null) => {
                set({ error });
            },

            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
