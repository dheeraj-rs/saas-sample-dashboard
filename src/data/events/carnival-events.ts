import type { Event } from '@/types/store.types'

export const carnivalEvents: Event[] = [
    {
        id: "carnival-event-1",
        name: "Innovate Global Summit - Business Leadership",
        organizationId: "org-1",
        organizationName: "Tech Innovators Inc",
        eventType: "carnival",
        startDate: "2026-05-20T09:00:00Z",
        endDate: "2026-05-22T17:00:00Z",
        status: "upcoming",
        activeDomain: "https://cloud-native-summit.techinnovators.com",
        registered: 600,
        description: "Everything cloud native, Kubernetes, and serverless.",
        location: "Seattle, WA",
        createdAt: "2025-12-20T10:00:00Z",
        updatedAt: "2026-01-08T10:00:00Z",
        logoUrl: "/images/events/event2.png",
        imageUrl: "/images/events/event2.png"
    }
]
