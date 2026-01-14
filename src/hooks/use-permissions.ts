import { useAccessControlStore } from '@/store/access-control.store'
import { useUserStore } from '@/store/user.store'
import type { PermissionType, FeatureFlags } from '@/types/store.types'

/**
 * Custom hook for permission and access control checks
 * 
 * Provides convenient methods to check user permissions, roles, and feature access.
 * 
 * @example
 * ```tsx
 * function EventManagement() {
 *   const { canManageEvents, canAccessAnalytics, isAdmin } = usePermissions()
 *   
 *   if (!canManageEvents) {
 *     return <AccessDenied />
 *   }
 *   
 *   return (
 *     <div>
 *       <EventList />
 *       {canAccessAnalytics && <Analytics />}
 *       {isAdmin && <AdminPanel />}
 *     </div>
 *   )
 * }
 * ```
 */
export function usePermissions() {
    const {
        permissions,
        roles,
        featureFlags,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        canAccessFeature,
        hasRole,
    } = useAccessControlStore()

    const { isAdmin, isSuperAdmin } = useUserStore()

    return {
        // Raw state
        permissions,
        roles,
        featureFlags,

        // Permission checks
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,

        // Specific permission checks
        canViewDashboard: () => hasPermission('view_dashboard'),
        canManageEvents: () => hasPermission('manage_events'),
        canManageUsers: () => hasPermission('manage_users'),
        canManagePayments: () => hasPermission('manage_payments'),
        canManageRegistrations: () => hasPermission('manage_registrations'),
        canManageSettings: () => hasPermission('manage_settings'),
        canViewAnalytics: () => hasPermission('view_analytics'),
        canExportData: () => hasPermission('export_data'),
        canManageOrganizations: () => hasPermission('manage_organizations'),
        canManagePermissions: () => hasPermission('manage_permissions'),

        // Feature access checks
        canAccessFeature,
        canAccessAnalytics: () => canAccessFeature('enableAnalytics'),
        canAccessPayments: () => canAccessFeature('enablePayments'),
        canAccessMultiOrg: () => canAccessFeature('enableMultiOrganization'),
        canAccessAdvancedReporting: () => canAccessFeature('enableAdvancedReporting'),
        canAccessCustomBranding: () => canAccessFeature('enableCustomBranding'),
        canAccessAPI: () => canAccessFeature('enableAPIAccess'),
        canAccessWebhooks: () => canAccessFeature('enableWebhooks'),
        canAccessSSO: () => canAccessFeature('enableSSO'),

        // Role checks
        hasRole,
        isAdmin: isAdmin(),
        isSuperAdmin: isSuperAdmin(),
    }
}
