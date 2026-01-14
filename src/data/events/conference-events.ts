import type { Event } from '@/types/store.types'

export const conferenceEvents: Event[] = [
    {
        id: "conf-event-1",
        name: "Future Forward 2024 - Tech Innovation Conference",
        organizationId: "org-1",
        organizationName: "Global Business Leaders",
        eventType: "conference",
        startDate: "2026-02-20T08:00:00Z",
        endDate: "2026-02-22T17:00:00Z",
        status: "upcoming",
        activeDomain: "https://future-health-2026.techinnovators.com",
        registered: 890,
        description: "Exploring the intersection of technology and healthcare.",
        location: "Boston, MA",
        createdAt: "2025-10-15T09:00:00Z",
        updatedAt: "2026-01-12T11:20:00Z",
        logoUrl: "/images/events/event2.png",
        imageUrl: "/images/events/event2.png"
    },
]
