import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Permission, Role, FeatureFlags, PermissionType } from '@/types/store.types'

/**
 * Access Control Store Interface
 * Manages user permissions, roles, and feature flags
 */
interface AccessControlStore {
    // State
    permissions: Permission[]
    roles: Role[]
    featureFlags: FeatureFlags

    // Actions
    setPermissions: (permissions: Permission[]) => void
    addPermission: (permission: Permission) => void
    removePermission: (permissionId: string) => void
    setRoles: (roles: Role[]) => void
    setFeatureFlags: (flags: Partial<FeatureFlags>) => void
    clearAccessControl: () => void

    // Permission checks
    hasPermission: (permissionType: PermissionType, scope?: 'global' | 'organization' | 'event', resourceId?: string) => boolean
    hasAnyPermission: (permissionTypes: PermissionType[]) => boolean
    hasAllPermissions: (permissionTypes: PermissionType[]) => boolean
    canAccessFeature: (feature: keyof FeatureFlags) => boolean

    // Role checks
    hasRole: (roleName: string) => boolean
}

const defaultFeatureFlags: FeatureFlags = {
    enableAnalytics: true,
    enablePayments: true,
    enableMultiOrganization: true,
    enableAdvancedReporting: false,
    enableCustomBranding: false,
    enableAPIAccess: false,
    enableWebhooks: false,
    enableSSO: false,
}

const initialState = {
    permissions: [] as Permission[],
    roles: [] as Role[],
    featureFlags: defaultFeatureFlags,
}

/**
 * Global Access Control Store
 * 
 * This store manages permissions, roles, and feature flags for access control.
 * It provides methods to check user permissions and feature availability.
 * 
 * @example
 * ```tsx
 * const { hasPermission, canAccessFeature } = useAccessControlStore()
 * 
 * // Check if user can manage events
 * if (hasPermission('manage_events')) {
 *   // Show event management UI
 * }
 * 
 * // Check if analytics feature is enabled
 * if (canAccessFeature('enableAnalytics')) {
 *   // Show analytics dashboard
 * }
 * ```
 */
export const useAccessControlStore = create<AccessControlStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setPermissions: (permissions: Permission[]) => {
                set({ permissions })
            },

            addPermission: (permission: Permission) => {
                set({
                    permissions: [...get().permissions, permission],
                })
            },

            removePermission: (permissionId: string) => {
                set({
                    permissions: get().permissions.filter(p => p.id !== permissionId),
                })
            },

            setRoles: (roles: Role[]) => {
                set({ roles })
            },

            setFeatureFlags: (flags: Partial<FeatureFlags>) => {
                set({
                    featureFlags: {
                        ...get().featureFlags,
                        ...flags,
                    },
                })
            },

            clearAccessControl: () => {
                set(initialState)
            },

            // Permission checks
            hasPermission: (
                permissionType: PermissionType,
                scope?: 'global' | 'organization' | 'event',
                resourceId?: string
            ) => {
                const permissions = get().permissions

                // If no scope specified, check if permission exists at any scope
                if (!scope) {
                    return permissions.some(p => p.type === permissionType)
                }

                // Check for specific scope
                if (!resourceId) {
                    return permissions.some(
                        p => p.type === permissionType && p.scope === scope
                    )
                }

                // Check for specific scope and resource
                return permissions.some(
                    p => p.type === permissionType &&
                        p.scope === scope &&
                        p.resourceId === resourceId
                )
            },

            hasAnyPermission: (permissionTypes: PermissionType[]) => {
                const permissions = get().permissions
                return permissionTypes.some(type =>
                    permissions.some(p => p.type === type)
                )
            },

            hasAllPermissions: (permissionTypes: PermissionType[]) => {
                const permissions = get().permissions
                return permissionTypes.every(type =>
                    permissions.some(p => p.type === type)
                )
            },

            canAccessFeature: (feature: keyof FeatureFlags) => {
                return get().featureFlags[feature]
            },

            // Role checks
            hasRole: (roleName: string) => {
                return get().roles.some(role => role.name === roleName)
            },
        }),
        {
            name: 'access-control-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist specific fields
            partialize: (state) => ({
                permissions: state.permissions,
                roles: state.roles,
                featureFlags: state.featureFlags,
            }),
        }
    )
)
