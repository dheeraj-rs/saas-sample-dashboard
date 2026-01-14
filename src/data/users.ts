import type { User } from '@/types/store.types'
import { allEvents } from '@/data/events'
import { organizations } from '@/data/organizations'

export const loginCredentials = {
    email: "admin@gmail.com",
    password: "password"
}

export const currentUser: User = {
    user_id: "user-1",
    name: "John Doe",
    email: "admin@gmail.com",
    role: "super_admin",
    avatar: "/avatars/john-doe.jpg",
    organization_ids: organizations.map(org => org.id),
    event_ids: allEvents.map(event => event.id),
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
    iat: Math.floor(Date.now() / 1000),
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: new Date().toISOString()
}

export function authenticateUser(email: string, password: string): User | null {
    if (email === loginCredentials.email && password === loginCredentials.password) {
        return {
            ...currentUser,
            exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
            iat: Math.floor(Date.now() / 1000),
            updatedAt: new Date().toISOString()
        }
    }
    return null
}

export function hasEventAccess(eventId: string): boolean {
    return currentUser.event_ids?.includes(eventId) ?? false
}

export function hasOrganizationAccess(organizationId: string): boolean {
    return currentUser.organization_ids?.includes(organizationId) ?? false
}

export function isTokenExpired(user: User): boolean {
    if (!user.exp) return true
    return Date.now() / 1000 > user.exp
}

export function getPrimaryOrganization(): string | undefined {
    return currentUser.organization_ids?.[0]
}