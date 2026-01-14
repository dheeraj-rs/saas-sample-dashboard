# State Management Guide

## Overview

This application uses **Zustand** for global state management with three main stores:

1. **App Context Store** - Manages current dashboard context and event/organization details
2. **User Store** - Manages user authentication and preferences
3. **Access Control Store** - Manages permissions and feature flags

All stores persist to localStorage for session continuity.

---

## App Context Store

### Purpose
Tracks which dashboard is currently active (organization, event, or multi-organization) and stores the current event/organization details.

### Usage

```tsx
import { useCurrentContext } from '@/hooks/use-current-context'

function MyComponent() {
  const {
    currentEvent,
    eventType,
    isEventDashboard,
    switchToEventDashboard,
  } = useCurrentContext()
  
  // Check current dashboard type
  if (isEventDashboard) {
    console.log('Currently on event dashboard')
  }
  
  // Get event type
  console.log('Event type:', eventType) // 'conference', 'ticketing', etc.
  
  return <div>...</div>
}
```

### Setting Event Context

When navigating to an event dashboard, set the event in the store:

```tsx
import { useAppContextStore } from '@/store/app-context.store'

function EventCard({ event }) {
  const { switchToEventDashboard } = useAppContextStore()
  
  const handleClick = () => {
    // Set the event in global store
    switchToEventDashboard({
      id: event.id,
      name: event.name,
      eventType: event.eventType, // 'conference', 'ticketing', etc.
      organizationId: event.organizationId,
      organizationName: event.organizationName,
      // ... other event details
    })
    
    // Navigate to event dashboard
    navigate(`/event-dashboard/${event.id}`)
  }
  
  return <button onClick={handleClick}>View Event</button>
}
```

### Event Types and Sidebars

The system supports six event types, each with its own sidebar:

| Event Type | Sidebar Component | Status |
|------------|------------------|--------|
| `conference` | `ConferenceSidebar` | ✅ Implemented |
| `ticketing` | `TicketingSidebar` | 🚧 TODO |
| `carnival` | `CarnivalSidebar` | 🚧 TODO |
| `workshop` | `WorkshopSidebar` | 🚧 TODO |
| `meetup` | `MeetupSidebar` | 🚧 TODO |
| `exhibition` | `ExhibitionSidebar` | 🚧 TODO |

The `EventDashboardLayout` automatically renders the correct sidebar based on the event type stored in the global context.

---

## User Store

### Purpose
Manages current user information, authentication state, and user preferences.

### Usage

```tsx
import { useUserStore } from '@/store/user.store'

function UserProfile() {
  const { user, updatePreferences, logout } = useUserStore()
  
  if (!user) {
    return <div>Not logged in</div>
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => updatePreferences({ theme: 'dark' })}>
        Switch to Dark Mode
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Setting User After Login

```tsx
import { useUserStore } from '@/store/user.store'

function LoginForm() {
  const { setUser } = useUserStore()
  
  const handleLogin = async (credentials) => {
    const userData = await loginAPI(credentials)
    
    // Set user in global store
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role, // 'super_admin', 'org_admin', etc.
      avatar: userData.avatar,
    })
    
    navigate('/dashboard')
  }
  
  return <form onSubmit={handleLogin}>...</form>
}
```

---

## Access Control Store

### Purpose
Manages user permissions, roles, and feature flags for access control.

### Usage

```tsx
import { usePermissions } from '@/hooks/use-permissions'

function EventManagement() {
  const {
    canManageEvents,
    canAccessAnalytics,
    isAdmin,
  } = usePermissions()
  
  if (!canManageEvents()) {
    return <AccessDenied />
  }
  
  return (
    <div>
      <EventList />
      {canAccessAnalytics() && <Analytics />}
      {isAdmin && <AdminPanel />}
    </div>
  )
}
```

### Setting Permissions

```tsx
import { useAccessControlStore } from '@/store/access-control.store'

function initializePermissions(userRole) {
  const { setPermissions, setFeatureFlags } = useAccessControlStore()
  
  // Set permissions based on user role
  setPermissions([
    {
      id: 'perm-1',
      type: 'manage_events',
      scope: 'organization',
      resourceId: 'org-123',
    },
    {
      id: 'perm-2',
      type: 'view_analytics',
      scope: 'global',
    },
  ])
  
  // Set feature flags
  setFeatureFlags({
    enableAnalytics: true,
    enablePayments: true,
    enableMultiOrganization: false,
  })
}
```

---

## Complete Example: Event Dashboard Navigation

Here's a complete example showing how to navigate from an organization dashboard to an event dashboard:

```tsx
import { useAppContextStore } from '@/store/app-context.store'
import { useNavigate } from 'react-router'

function RecentEvents({ events }) {
  const { switchToEventDashboard } = useAppContextStore()
  const navigate = useNavigate()
  
  const handleEventClick = (event) => {
    // 1. Set the event context in global store
    switchToEventDashboard({
      id: event.id,
      name: event.name,
      eventType: event.eventType, // This determines which sidebar to show
      organizationId: event.organizationId,
      organizationName: event.organizationName,
      status: event.status,
      startDate: event.startDate,
      endDate: event.endDate,
    })
    
    // 2. Navigate to event dashboard
    navigate(`/event-dashboard/${event.id}`)
  }
  
  return (
    <div>
      {events.map(event => (
        <div key={event.id} onClick={() => handleEventClick(event)}>
          <h3>{event.name}</h3>
          <span>{event.eventType}</span>
        </div>
      ))}
    </div>
  )
}
```

The `EventDashboardLayout` will automatically:
1. Read the event type from the global store
2. Render the appropriate sidebar (e.g., `ConferenceSidebar` for conference events)
3. Persist the state so refreshing the page maintains the context

---

## Best Practices

### 1. Always Set Context When Navigating

When navigating between dashboards, always update the global context:

```tsx
// ✅ Good
switchToEventDashboard(event)
navigate('/event-dashboard')

// ❌ Bad - context not set
navigate('/event-dashboard')
```

### 2. Use Custom Hooks

Use the custom hooks (`useCurrentContext`, `usePermissions`) instead of accessing stores directly:

```tsx
// ✅ Good
const { eventType, isConference } = useCurrentContext()

// ❌ Bad
const eventType = useAppContextStore().getEventType()
```

### 3. Check Permissions Before Rendering

Always check permissions before rendering sensitive components:

```tsx
// ✅ Good
const { canManageUsers } = usePermissions()
if (!canManageUsers()) return null

// ❌ Bad - no permission check
return <UserManagement />
```

### 4. Clear Context on Logout

Always clear all stores when user logs out:

```tsx
const { logout } = useUserStore()
const { clearContext } = useAppContextStore()
const { clearAccessControl } = useAccessControlStore()

const handleLogout = () => {
  logout()
  clearContext()
  clearAccessControl()
  navigate('/login')
}
```

---

## Creating New Event Type Sidebars

To add a new sidebar for a specific event type:

1. **Create the sidebar component** in `src/features/event-dashboard/components/event-layout/`:

```tsx
// ticketing-sidebar.tsx
export function TicketingSidebar() {
  const sidebarData = {
    navMain: [
      { title: "Dashboard", url: "/event-dashboard", icon: IconDashboard },
      { title: "Tickets", url: "/event-dashboard/tickets", icon: IconTicket },
      // ... ticketing-specific menu items
    ],
  }
  
  return <Sidebar>...</Sidebar>
}
```

2. **Import and add to the switch statement** in `dashboard-layout.tsx`:

```tsx
import { TicketingSidebar } from "../components/event-layout/ticketing-sidebar"

// In getSidebar():
case "ticketing":
  return <TicketingSidebar />
```

3. **Update the event type** when creating/editing events to use the new type.

---

## Troubleshooting

### Sidebar not changing when navigating to event

**Problem:** The sidebar doesn't update when navigating to a different event type.

**Solution:** Make sure you're calling `switchToEventDashboard()` before navigating:

```tsx
switchToEventDashboard(event) // This sets the event type in store
navigate('/event-dashboard')
```

### State lost on page refresh

**Problem:** The event context is lost when refreshing the page.

**Solution:** The stores use localStorage persistence by default. Make sure:
1. localStorage is enabled in the browser
2. The store keys are not being cleared elsewhere
3. Check browser console for any errors

### Permission checks not working

**Problem:** Permission checks always return false.

**Solution:** Make sure permissions are set after login:

```tsx
const { setPermissions } = useAccessControlStore()
setPermissions(userPermissions) // Set from API response
```
