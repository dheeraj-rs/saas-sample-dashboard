import type { Event } from '@/types/store.types'
import { conferenceEvents } from './conference-events'
import { workshopEvents } from './workshop-events'
import { meetupEvents } from './meetup-events'
import { carnivalEvents } from './carnival-events'
import { exhibitionEvents } from './exhibition-events'
import { ticketingEvents } from './ticketing-events'

export const allEvents: Event[] = [
    ...conferenceEvents,
    ...workshopEvents,
    ...meetupEvents,
    ...carnivalEvents,
    ...exhibitionEvents,
    ...ticketingEvents
]

export function getEventsByType(eventType: Event['eventType']): Event[] {
    switch (eventType) {
        case 'conference':
            return conferenceEvents
        case 'workshop':
            return workshopEvents
        case 'meetup':
            return meetupEvents
        case 'carnival':
            return carnivalEvents
        case 'exhibition':
            return exhibitionEvents
        case 'ticketing':
            return ticketingEvents
        default:
            return []
    }
}

export { conferenceEvents } from './conference-events'
export { workshopEvents } from './workshop-events'
export { meetupEvents } from './meetup-events'
export { carnivalEvents } from './carnival-events'
export { exhibitionEvents } from './exhibition-events'
export { ticketingEvents } from './ticketing-events'
