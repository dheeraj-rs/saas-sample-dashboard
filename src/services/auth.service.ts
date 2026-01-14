import { authenticateUser, currentUser } from '@/data/users'
import { useUserStore } from '@/store/user.store'
import { useAppContextStore } from '@/store/app-context.store'
import { initializePermissions } from '@/lib/store-helpers'
import { organizations } from '@/data/organizations'

/**
 * Authentication Service
 * Connects login data with authentication flow
 */

export interface LoginResponse {
    success: boolean
    user?: typeof currentUser
    error?: string
}

/**
 * Login user with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        // Authenticate user
        const user = authenticateUser(email, password)

        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password'
            }
        }

        // Set user in store
        useUserStore.getState().setUser(user)

        // Initialize permissions based on role
        const primaryOrgId = user.organization_ids?.[0]
        if (primaryOrgId) {
            initializePermissions(user.role, primaryOrgId)
        }

        // Set organization context
        const primaryOrg = organizations.find(org => org.id === primaryOrgId)
        if (primaryOrg) {
            useAppContextStore.getState().switchToOrganizationDashboard(primaryOrg)
        }

        return {
            success: true,
            user
        }
    } catch (error) {
        return {
            success: false,
            error: 'An error occurred during login'
        }
    }
}

/**
 * Logout user
 */
export function logout(): void {
    // Clear user store
    useUserStore.getState().logout()

    // Clear app context
    useAppContextStore.getState().clearContext()
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return useUserStore.getState().isAuthenticated
}

/**
 * Get current authenticated user
 */
export function getCurrentUser() {
    return useUserStore.getState().user
}

/**
 * Auto-login for development (optional)
 * Use this to skip login in development mode
 */
export async function autoLoginDev(): Promise<LoginResponse> {
    if (import.meta.env.DEV) {
        // Auto-login with default credentials
        return login('admin@gmail.com', 'password')
    }
    return {
        success: false,
        error: 'Auto-login only available in development mode'
    }
}
