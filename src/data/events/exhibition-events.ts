import type { Event } from '@/types/store.types'

export const exhibitionEvents: Event[] = [
    {
        id: "exhibition-event-1",
        name: "Flow Startup Summit - Networking & Collaboration",
        organizationId: "org-1",
        organizationName: "Startup Accelerator",
        eventType: "exhibition",
        startDate: "2025-12-20T19:00:00Z",
        endDate: "2025-12-20T23:00:00Z",
        status: "past",
        registered: 350,
        description: "End of year networking event.",
        location: "Chicago, IL",
        createdAt: "2025-11-10T10:00:00Z",
        updatedAt: "2025-12-21T10:00:00Z",
        logoUrl: "/images/events/event1.png",
        imageUrl: "/images/events/event1.png"
    }
]
