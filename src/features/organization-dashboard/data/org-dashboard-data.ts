import type { Event, Organization } from '@/types/store.types'
import { allEvents } from '@/data/events'
import { organizations } from '@/data/organizations'

export interface OrgMetric {
    totalUsers: number
    activeUsers: number
    totalTickets: number
    totalRevenue: number
}

export const orgMetrics: OrgMetric = {
    totalUsers: 24500,
    activeUsers: 18200,
    totalTickets: 15420,
    totalRevenue: 2500000
}

// Organization data - using first organization from centralized data
export const currentOrganization: Organization = organizations[0]

// Events data - using all events from centralized data
export const orgEvents: Event[] = allEvents
