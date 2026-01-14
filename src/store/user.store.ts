import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, UserPreferences } from '@/types/store.types'

/**
 * User Store Interface
 * Manages current user information, authentication state, and preferences
 */
interface UserStore {
    // State
    user: User | null
    isAuthenticated: boolean
    preferences: UserPreferences

    // Actions
    setUser: (user: User | null) => void
    updateUser: (updates: Partial<User>) => void
    setAuthenticated: (isAuthenticated: boolean) => void
    updatePreferences: (preferences: Partial<UserPreferences>) => void
    logout: () => void

    // Computed getters
    getUserRole: () => string | null
    isAdmin: () => boolean
    isSuperAdmin: () => boolean
}

const defaultPreferences: UserPreferences = {
    theme: 'system',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    pushNotifications: false,
}

const initialState = {
    user: null as User | null,
    isAuthenticated: false,
    preferences: defaultPreferences,
}

/**
 * Global User Store
 * 
 * This store manages the current user's information, authentication state,
 * and preferences. It persists to localStorage for session continuity.
 * 
 * @example
 * ```tsx
 * const { user, setUser, isAuthenticated, updatePreferences } = useUserStore()
 * 
 * // Set user after login
 * setUser({
 *   id: 'user-1',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'org_admin',
 * })
 * 
 * // Update preferences
 * updatePreferences({ theme: 'dark' })
 * ```
 */
export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setUser: (user: User | null) => {
                set({
                    user,
                    isAuthenticated: user !== null,
                })
            },

            updateUser: (updates: Partial<User>) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: {
                            ...currentUser,
                            ...updates,
                        },
                    })
                }
            },

            setAuthenticated: (isAuthenticated: boolean) => {
                set({ isAuthenticated })
            },

            updatePreferences: (preferences: Partial<UserPreferences>) => {
                set({
                    preferences: {
                        ...get().preferences,
                        ...preferences,
                    },
                })
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    preferences: defaultPreferences,
                })
            },

            // Computed getters
            getUserRole: () => {
                return get().user?.role || null
            },

            isAdmin: () => {
                const role = get().user?.role
                return role === 'super_admin' || role === 'org_admin' || role === 'event_admin'
            },

            isSuperAdmin: () => {
                return get().user?.role === 'super_admin'
            },
        }),
        {
            name: 'user-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist specific fields
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                preferences: state.preferences,
            }),
        }
    )
)
