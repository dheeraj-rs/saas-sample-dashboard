import { useAppContextStore } from '@/store/app-context.store'
import type { Organization, Event, EventType } from '@/types/store.types'

/**
 * Custom hook for accessing current application context
 * 
 * Provides easy access to current dashboard state, organization, and event details
 * with helpful utility methods for conditional rendering.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { 
 *     currentEvent, 
 *     eventType, 
 *     isEventDashboard,
 *     switchToEventDashboard 
 *   } = useCurrentContext()
 *   
 *   if (isEventDashboard && eventType === 'conference') {
 *     return <ConferenceView />
 *   }
 *   
 *   return <DefaultView />
 * }
 * ```
 */
export function useCurrentContext() {
    const {
        currentDashboard,
        currentOrganization,
        currentEvent,
        getEventType,
        isEventDashboard,
        isOrganizationDashboard,
        isMultiOrganizationDashboard,
        switchToOrganizationDashboard,
        switchToEventDashboard,
        switchToMultiOrganizationDashboard,
        clearContext,
    } = useAppContextStore()

    return {
        // Current state
        currentDashboard,
        currentOrganization,
        currentEvent,
        eventType: getEventType() as EventType | null,

        // Dashboard type checks
        isEventDashboard: isEventDashboard(),
        isOrganizationDashboard: isOrganizationDashboard(),
        isMultiOrganizationDashboard: isMultiOrganizationDashboard(),

        // Event type checks
        isConference: getEventType() === 'conference',
        isTicketing: getEventType() === 'ticketing',
        isCarnival: getEventType() === 'carnival',
        isWorkshop: getEventType() === 'workshop',
        isMeetup: getEventType() === 'meetup',
        isExhibition: getEventType() === 'exhibition',

        // Actions
        switchToOrganizationDashboard,
        switchToEventDashboard,
        switchToMultiOrganizationDashboard,
        clearContext,

        // Utility methods
        setOrganization: (org: Organization) => switchToOrganizationDashboard(org),
        setEvent: (event: Event) => switchToEventDashboard(event),
    }
}
