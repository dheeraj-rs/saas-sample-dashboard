import type { Event } from '@/types/store.types'

export const workshopEvents: Event[] = [
    {
        id: "workshop-event-1",
        name: "Cloud Computing Summit",
        organizationId: "org-1",
        organizationName: "AI Research Institute",
        eventType: "workshop",
        startDate: "2026-03-15T09:00:00Z",
        endDate: "2026-03-17T18:00:00Z",
        status: "upcoming",
        activeDomain: "https://global-tech-summit-2026.techinnovators.com",
        registered: 1250,
        description: "The premier global event for technology leaders and innovators.",
        location: "San Francisco, CA",
        createdAt: "2025-11-01T10:00:00Z",
        updatedAt: "2026-01-10T14:30:00Z",
        logoUrl: "/images/events/event1.png",
        imageUrl: "/images/events/event1.png"
    },
]
