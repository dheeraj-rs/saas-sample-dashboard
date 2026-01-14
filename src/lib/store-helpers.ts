/**
 * Store Initialization Helper
 * 
 * This file provides helper functions to initialize the global stores
 * with mock or real data during app startup or after login.
 */

import { useAppContextStore } from '@/store/app-context.store'
import { useUserStore } from '@/store/user.store'
import { useAccessControlStore } from '@/store/access-control.store'
import type { User, Permission, FeatureFlags } from '@/types/store.types'

/**
 * Initialize user store after successful login
 */
export function initializeUserStore(userData: User) {
    const { setUser } = useUserStore.getState()
    setUser(userData)
}

/**
 * Initialize permissions based on user role
 */
export function initializePermissions(userRole: string, organizationId?: string) {
    const { setPermissions, setFeatureFlags } = useAccessControlStore.getState()

    // Define permissions based on role
    const permissions: Permission[] = []

    switch (userRole) {
        case 'super_admin':
            permissions.push(
                { id: 'perm-1', type: 'manage_organizations', scope: 'global' },
                { id: 'perm-2', type: 'manage_permissions', scope: 'global' },
                { id: 'perm-3', type: 'view_analytics', scope: 'global' },
                { id: 'perm-4', type: 'manage_events', scope: 'global' },
                { id: 'perm-5', type: 'manage_users', scope: 'global' },
                { id: 'perm-6', type: 'manage_payments', scope: 'global' },
                { id: 'perm-7', type: 'export_data', scope: 'global' }
            )
            break

        case 'org_admin':
            if (organizationId) {
                permissions.push(
                    { id: 'perm-1', type: 'manage_events', scope: 'organization', resourceId: organizationId },
                    { id: 'perm-2', type: 'manage_users', scope: 'organization', resourceId: organizationId },
                    { id: 'perm-3', type: 'view_analytics', scope: 'organization', resourceId: organizationId },
                    { id: 'perm-4', type: 'manage_payments', scope: 'organization', resourceId: organizationId },
                    { id: 'perm-5', type: 'manage_settings', scope: 'organization', resourceId: organizationId }
                )
            }
            break

        case 'event_admin':
            permissions.push(
                { id: 'perm-1', type: 'manage_registrations', scope: 'event' },
                { id: 'perm-2', type: 'view_analytics', scope: 'event' },
                { id: 'perm-3', type: 'manage_settings', scope: 'event' }
            )
            break

        case 'manager':
            permissions.push(
                { id: 'perm-1', type: 'view_dashboard', scope: 'event' },
                { id: 'perm-2', type: 'manage_registrations', scope: 'event' }
            )
            break

        default:
            permissions.push(
                { id: 'perm-1', type: 'view_dashboard', scope: 'event' }
            )
    }

    setPermissions(permissions)

    // Set feature flags based on role/plan
    const featureFlags: Partial<FeatureFlags> = {
        enableAnalytics: userRole === 'super_admin' || userRole === 'org_admin',
        enablePayments: true,
        enableMultiOrganization: userRole === 'super_admin',
        enableAdvancedReporting: userRole === 'super_admin',
        enableCustomBranding: userRole === 'super_admin' || userRole === 'org_admin',
        enableAPIAccess: userRole === 'super_admin',
        enableWebhooks: userRole === 'super_admin',
        enableSSO: userRole === 'super_admin' || userRole === 'org_admin',
    }

    setFeatureFlags(featureFlags)
}

/**
 * Clear all stores (useful for logout)
 */
export function clearAllStores() {
    const { clearContext } = useAppContextStore.getState()
    const { logout } = useUserStore.getState()
    const { clearAccessControl } = useAccessControlStore.getState()

    clearContext()
    logout()
    clearAccessControl()
}

/**
 * Initialize stores with mock data for development/testing
 */
export function initializeMockStores() {
    // Mock user
    initializeUserStore({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'org_admin',
        avatar: '/avatars/john.jpg',
        organizationId: 'org-1',
    })

    // Mock permissions
    initializePermissions('org_admin', 'org-1')

    // Mock organization context
    const { switchToOrganizationDashboard } = useAppContextStore.getState()
    switchToOrganizationDashboard({
        id: 'org-1',
        name: 'Tech Innovators Inc',
        plan: 'Enterprise',
        logo: '/logos/tech-innovators.png',
    })
}

/**
 * Get current user from store (useful for API calls)
 */
export function getCurrentUser() {
    return useUserStore.getState().user
}

/**
 * Get current event from store
 */
export function getCurrentEvent() {
    return useAppContextStore.getState().currentEvent
}

/**
 * Get current organization from store
 */
export function getCurrentOrganization() {
    return useAppContextStore.getState().currentOrganization
}

/**
 * Check if user has specific permission
 */
export function checkPermission(permissionType: string, scope?: string, resourceId?: string) {
    return useAccessControlStore.getState().hasPermission(
        permissionType as any,
        scope as any,
        resourceId
    )
}
