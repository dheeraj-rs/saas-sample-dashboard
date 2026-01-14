# Data Structure Documentation

## Overview

The application data is now organized into separate files by entity type for better maintainability and type safety.

## Directory Structure

```
src/data/
├── events/
│   ├── conference-events.ts    # Conference-type events
│   ├── workshop-events.ts      # Workshop-type events
│   ├── meetup-events.ts        # Meetup-type events
│   ├── carnival-events.ts      # Carnival-type events
│   ├── exhibition-events.ts    # Exhibition-type events
│   ├── ticketing-events.ts     # Ticketing-type events
│   └── index.ts                # Aggregates all events + utility functions
└── organizations.ts            # Organization data
```

## Event Types

Each event type has its own dedicated file:

| Event Type | File | Description |
|------------|------|-------------|
| `conference` | `conference-events.ts` | Professional conferences |
| `workshop` | `workshop-events.ts` | Hands-on training workshops |
| `meetup` | `meetup-events.ts` | Networking meetups |
| `carnival` | `carnival-events.ts` | Festival/carnival events |
| `exhibition` | `exhibition-events.ts` | Exhibition/showcase events |
| `ticketing` | `ticketing-events.ts` | Ticketing-focused events |

## Usage Examples

### Import All Events

```typescript
import { allEvents } from '@/data/events'

// Use all events
const events = allEvents
```

### Import Specific Event Type

```typescript
import { conferenceEvents } from '@/data/events'

// Use only conference events
const conferences = conferenceEvents
```

### Get Events by Type

```typescript
import { getEventsByType } from '@/data/events'

// Get all workshop events
const workshops = getEventsByType('workshop')
```

### Get Event by ID

```typescript
import { getEventById } from '@/data/events'

// Find specific event
const event = getEventById('conf-event-1')
```

### Organizations

```typescript
import { organizations, getOrganizationById } from '@/data/organizations'

// Get all organizations
const allOrgs = organizations

// Get specific organization
const org = getOrganizationById('org-1')
```

## Updating Organization Dashboard

Update the organization dashboard to use the new data structure:

```typescript
// Before
import { orgEvents } from '../../data/org-dashboard-data'

// After
import { allEvents } from '@/data/events'
import { currentOrganization } from '@/data/organizations'
```

## Benefits

1. **Type Safety** - All data uses proper TypeScript types
2. **Modularity** - Each event type in its own file
3. **Reusability** - Import only what you need
4. **Maintainability** - Easy to find and update specific event types
5. **Scalability** - Easy to add new event types

## Migration Guide

### Step 1: Update Imports

Replace old imports:
```typescript
// Old
import { orgEvents } from '@/features/organization-dashboard/data/org-dashboard-data'

// New
import { allEvents } from '@/data/events'
```

### Step 2: Update Variable Names

```typescript
// Old
const events = orgEvents

// New
const events = allEvents
```

### Step 3: Filter by Type (if needed)

```typescript
// Get only conferences
const conferences = getEventsByType('conference')

// Or filter manually
const workshops = allEvents.filter(e => e.eventType === 'workshop')
```

## Adding New Events

To add a new event:

1. Open the appropriate event type file (e.g., `conference-events.ts`)
2. Add the new event object to the array
3. Ensure all required fields are filled
4. The event will automatically be included in `allEvents`

Example:
```typescript
// In conference-events.ts
export const conferenceEvents: Event[] = [
    // ... existing events
    {
        id: "conf-event-4",
        name: "New Conference 2026",
        organizationId: "org-1",
        organizationName: "Tech Innovators Inc",
        eventType: "conference",
        // ... other fields
    }
]
```
