import type { Event } from '@/types/store.types'

export const meetupEvents: Event[] = [
    {
        id: "meetup-event-1",
        name: "Digital Transformation Workshop 2024",
        organizationId: "org-1",
        organizationName: "Digital First Consulting",
        eventType: "meetup",
        startDate: "2026-01-05T09:00:00Z",
        endDate: "2026-01-06T17:00:00Z",
        status: "active",
        activeDomain: "https://ai-ethics-2026.techinnovators.com",
        registered: 450,
        description: "Discussing the ethical implications of Artificial Intelligence.",
        location: "London, UK",
        createdAt: "2025-09-01T10:00:00Z",
        updatedAt: "2026-01-06T10:00:00Z",
        logoUrl: "/images/events/event1.png",
        imageUrl: "/images/events/event1.png"
    },
]
