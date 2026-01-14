import type { Event } from '@/types/store.types'

export const ticketingEvents: Event[] = [
    {
        id: "ticketing-event-1",
        name: "AI & Machine Learning Conference",
        organizationId: "org-1",
        organizationName: "AI Research Institute",
        eventType: "ticketing",
        startDate: "2026-07-15T12:00:00Z",
        endDate: "2026-07-17T23:00:00Z",
        status: "upcoming",
        activeDomain: "https://music-fest-2026.techinnovators.com",
        registered: 5000,
        description: "Annual music festival with multiple stages and artists.",
        location: "Los Angeles, CA",
        createdAt: "2026-01-01T10:00:00Z",
        updatedAt: "2026-01-14T10:00:00Z",
        logoUrl: "/images/events/event1.png",
        imageUrl: "/images/events/event1.png"
    }
]
