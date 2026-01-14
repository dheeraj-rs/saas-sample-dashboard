import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Organization, Event, DashboardType } from '@/types/store.types'

/**
 * App Context Store Interface
 * Manages the current application context including active dashboard,
 * organization, and event details
 */
interface AppContextStore {
    // State
    currentDashboard: DashboardType
    currentOrganization: Organization | null
    currentEvent: Event | null

    // Actions
    setCurrentDashboard: (dashboard: DashboardType) => void
    setCurrentOrganization: (organization: Organization | null) => void
    setCurrentEvent: (event: Event | null) => void
    switchToOrganizationDashboard: (organization: Organization) => void
    switchToEventDashboard: (event: Event) => void
    switchToMultiOrganizationDashboard: () => void
    clearContext: () => void

    // Computed getters
    getEventType: () => string | null
    isEventDashboard: () => boolean
    isOrganizationDashboard: () => boolean
    isMultiOrganizationDashboard: () => boolean
}

const initialState = {
    currentDashboard: null as DashboardType,
    currentOrganization: null as Organization | null,
    currentEvent: null as Event | null,
}

/**
 * Global App Context Store
 * 
 * This store manages the current application context across all dashboards.
 * It persists to localStorage to maintain state across page refreshes.
 * 
 * @example
 * ```tsx
 * const { currentEvent, switchToEventDashboard } = useAppContextStore()
 * 
 * // Switch to an event dashboard
 * switchToEventDashboard({
 *   id: 'event-1',
 *   name: 'Tech Conference 2026',
 *   eventType: 'conference',
 *   // ... other event details
 * })
 * ```
 */
export const useAppContextStore = create<AppContextStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setCurrentDashboard: (dashboard: DashboardType) => {
                set({ currentDashboard: dashboard })
            },

            setCurrentOrganization: (organization: Organization | null) => {
                set({ currentOrganization: organization })
            },

            setCurrentEvent: (event: Event | null) => {
                set({ currentEvent: event })
            },

            switchToOrganizationDashboard: (organization: Organization) => {
                set({
                    currentDashboard: 'organization',
                    currentOrganization: organization,
                    currentEvent: null, // Clear event when switching to org dashboard
                })
            },

            switchToEventDashboard: (event: Event) => {
                set({
                    currentDashboard: 'event',
                    currentEvent: event,
                    // Keep organization if it matches, otherwise clear
                    currentOrganization: get().currentOrganization?.id === event.organizationId
                        ? get().currentOrganization
                        : null,
                })
            },

            switchToMultiOrganizationDashboard: () => {
                set({
                    currentDashboard: 'multi-organization',
                    currentOrganization: null,
                    currentEvent: null,
                })
            },

            clearContext: () => {
                set(initialState)
            },

            // Computed getters
            getEventType: () => {
                return get().currentEvent?.eventType || null
            },

            isEventDashboard: () => {
                return get().currentDashboard === 'event'
            },

            isOrganizationDashboard: () => {
                return get().currentDashboard === 'organization'
            },

            isMultiOrganizationDashboard: () => {
                return get().currentDashboard === 'multi-organization'
            },
        }),
        {
            name: 'app-context-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist specific fields
            partialize: (state) => ({
                currentDashboard: state.currentDashboard,
                currentOrganization: state.currentOrganization,
                currentEvent: state.currentEvent,
            }),
        }
    )
)
