/**
 * Example: How to integrate the global store with event navigation
 * 
 * This file demonstrates how to use the app context store when navigating
 * from an organization dashboard to an event dashboard.
 */

import { useAppContextStore } from '@/store/app-context.store'
import { useCurrentContext } from '@/hooks/use-current-context'
import { useNavigate } from 'react-router'
import type { Event } from '@/types/store.types'

/**
 * Example 1: Event Card Component
 * 
 * When a user clicks on an event card, set the event context before navigating
 */
export function EventCardExample({ event }: { event: Event }) {
    const { switchToEventDashboard } = useAppContextStore()
    const navigate = useNavigate()

    const handleEventClick = () => {
        // Set the event in global store
        // This will automatically make the correct sidebar appear
        switchToEventDashboard({
            id: event.id,
            name: event.name,
            eventType: event.eventType, // 'conference', 'ticketing', etc.
            organizationId: event.organizationId,
            organizationName: event.organizationName,
            status: event.status,
            startDate: event.startDate,
            endDate: event.endDate,
            description: event.description,
            location: event.location,
        })

        // Navigate to event dashboard
        navigate(`/event-dashboard/${event.id}`)
    }

    return (
        <div onClick={handleEventClick} className="cursor-pointer">
            <h3>{event.name}</h3>
            <span className="badge">{event.eventType}</span>
        </div>
    )
}

/**
 * Example 2: Recent Events List
 * 
 * Display a list of recent events and allow navigation
 */
export function RecentEventsExample() {
    const { switchToEventDashboard } = useAppContextStore()
    const navigate = useNavigate()

    // Mock data - replace with actual API call
    const recentEvents: Event[] = [
        {
            id: 'evt-1',
            name: 'Tech Conference 2026',
            eventType: 'conference',
            organizationId: 'org-1',
            organizationName: 'Tech Innovators',
            status: 'upcoming',
            startDate: '2026-03-15',
            endDate: '2026-03-17',
        },
        {
            id: 'evt-2',
            name: 'Music Festival',
            eventType: 'carnival',
            organizationId: 'org-1',
            organizationName: 'Tech Innovators',
            status: 'upcoming',
            startDate: '2026-04-20',
            endDate: '2026-04-22',
        },
    ]

    const handleEventClick = (event: Event) => {
        switchToEventDashboard(event)
        navigate(`/event-dashboard/${event.id}`)
    }

    return (
        <div>
            <h2>Recent Events</h2>
            {recentEvents.map(event => (
                <div key={event.id} onClick={() => handleEventClick(event)}>
                    <h4>{event.name}</h4>
                    <p>{event.eventType}</p>
                </div>
            ))}
        </div>
    )
}

/**
 * Example 3: Event Switcher Dropdown
 * 
 * Allow users to switch between events from a dropdown
 */
export function EventSwitcherExample() {
    const { currentEvent, switchToEventDashboard } = useAppContextStore()
    const navigate = useNavigate()

    // Mock events - replace with actual API call
    const availableEvents: Event[] = [
        {
            id: 'evt-1',
            name: 'Tech Conference 2026',
            eventType: 'conference',
            organizationId: 'org-1',
            organizationName: 'Tech Innovators',
            status: 'active',
            startDate: '2026-03-15',
            endDate: '2026-03-17',
        },
        {
            id: 'evt-2',
            name: 'Workshop Series',
            eventType: 'workshop',
            organizationId: 'org-1',
            organizationName: 'Tech Innovators',
            status: 'upcoming',
            startDate: '2026-04-10',
            endDate: '2026-04-12',
        },
    ]

    const handleEventSwitch = (event: Event) => {
        switchToEventDashboard(event)
        navigate(`/event-dashboard/${event.id}`)
    }

    return (
        <div>
            <select
                value={currentEvent?.id || ''}
                onChange={(e) => {
                    const event = availableEvents.find(ev => ev.id === e.target.value)
                    if (event) handleEventSwitch(event)
                }}
            >
                {availableEvents.map(event => (
                    <option key={event.id} value={event.id}>
                        {event.name} ({event.eventType})
                    </option>
                ))}
            </select>
        </div>
    )
}

/**
 * Example 4: Organization to Event Navigation
 * 
 * Navigate from organization dashboard to a specific event
 */
export function OrganizationEventListExample() {
    const { switchToEventDashboard, currentOrganization } = useAppContextStore()
    const navigate = useNavigate()

    // Mock organization events
    const organizationEvents: Event[] = [
        {
            id: 'evt-1',
            name: 'Annual Summit',
            eventType: 'conference',
            organizationId: currentOrganization?.id || 'org-1',
            organizationName: currentOrganization?.name || 'My Organization',
            status: 'upcoming',
            startDate: '2026-05-01',
            endDate: '2026-05-03',
        },
        {
            id: 'evt-2',
            name: 'Product Exhibition',
            eventType: 'exhibition',
            organizationId: currentOrganization?.id || 'org-1',
            organizationName: currentOrganization?.name || 'My Organization',
            status: 'upcoming',
            startDate: '2026-06-15',
            endDate: '2026-06-17',
        },
    ]

    const viewEventDashboard = (event: Event) => {
        // Set event context
        switchToEventDashboard(event)

        // Navigate to event dashboard
        navigate(`/event-dashboard/${event.id}`)
    }

    return (
        <div>
            <h2>Organization Events</h2>
            <div className="grid">
                {organizationEvents.map(event => (
                    <div key={event.id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Type: {event.eventType}</p>
                        <p>Status: {event.status}</p>
                        <button onClick={() => viewEventDashboard(event)}>
                            View Dashboard
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Example 5: Using the custom hook
 * 
 * Use the useCurrentContext hook for easier access
 */
export function EventDashboardPageExample() {
    const {
        currentEvent,
        eventType,
        isConference,
        isTicketing,
        isCarnival
    } = useCurrentContext()

    if (!currentEvent) {
        return <div>No event selected</div>
    }

    return (
        <div>
            <h1>{currentEvent.name}</h1>
            <p>Event Type: {eventType}</p>

            {/* Conditional rendering based on event type */}
            {isConference && <ConferenceSpecificComponent />}
            {isTicketing && <TicketingSpecificComponent />}
            {isCarnival && <CarnivalSpecificComponent />}

            {/* The EventDashboardLayout will automatically show the correct sidebar */}
        </div>
    )
}

// Placeholder components
function ConferenceSpecificComponent() {
    return <div>Conference-specific content</div>
}

function TicketingSpecificComponent() {
    return <div>Ticketing-specific content</div>
}

function CarnivalSpecificComponent() {
    return <div>Carnival-specific content</div>
}
