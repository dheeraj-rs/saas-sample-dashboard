export type DashboardType = 'organization' | 'event' | 'multi-organization' | null
export type EventType = 'conference' | 'ticketing' | 'carnival' | 'workshop' | 'meetup' | 'exhibition'
export type EventStatus = 'draft' | 'upcoming' | 'active' | 'past' | 'cancelled'

export interface Organization {
    id: string
    name: string
    plan: string
    logo?: string
    createdAt?: string
    updatedAt?: string
}

export interface Event {
    id: string
    name: string
    organizationId: string
    organizationName: string
    eventType: EventType
    startDate: string
    endDate: string
    status: EventStatus
    activeDomain?: string
    registered?: number
    description?: string
    location?: string
    logoUrl?: string
    imageUrl?: string // Event card/banner image
    createdAt?: string
    updatedAt?: string
}


export type UserRole = 'super_admin' | 'org_admin' | 'event_admin' | 'manager' | 'staff' | 'viewer'


export interface User {
    id?: string // Legacy field
    user_id?: string // New user ID field
    name: string
    email: string
    avatar?: string
    role: UserRole
    organizationId?: string // Legacy single organization
    organization_ids?: string[] // New: Multiple organizations
    event_ids?: string[] // New: Accessible events
    exp?: number // JWT expiration timestamp
    iat?: number // JWT issued at timestamp
    createdAt?: string
    updatedAt?: string
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
    emailNotifications: boolean
    pushNotifications: boolean
}

export type PermissionType =
    | 'view_dashboard'
    | 'manage_events'
    | 'manage_users'
    | 'manage_payments'
    | 'manage_registrations'
    | 'manage_settings'
    | 'view_analytics'
    | 'export_data'
    | 'manage_organizations'
    | 'manage_permissions'

export interface Permission {
    id: string
    type: PermissionType
    scope: 'global' | 'organization' | 'event'
    resourceId?: string
}

export interface Role {
    id: string
    name: UserRole
    displayName: string
    permissions: PermissionType[]
    description?: string
}

export interface FeatureFlags {
    enableAnalytics: boolean
    enablePayments: boolean
    enableMultiOrganization: boolean
    enableAdvancedReporting: boolean
    enableCustomBranding: boolean
    enableAPIAccess: boolean
    enableWebhooks: boolean
    enableSSO: boolean
}

export interface AppContextState {
    currentDashboard: DashboardType
    currentOrganization: Organization | null
    currentEvent: Event | null
}

export interface UserState {
    user: User | null
    isAuthenticated: boolean
    preferences: UserPreferences
}

export interface AccessControlState {
    permissions: Permission[]
    roles: Role[]
    featureFlags: FeatureFlags
}
