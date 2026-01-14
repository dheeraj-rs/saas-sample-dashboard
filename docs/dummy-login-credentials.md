# Dummy Data - Login User

## ⚠️ IMPORTANT
**This is dummy data for development/testing ONLY. DO NOT use in production!**

## Current Logged-In User

### Admin User
- **Email:** `admin@techinnovators.com`
- **Password:** `admin123`
- **Name:** John Doe
- **Role:** Super Admin
- **Organization:** Tech Innovators Inc (org-1)
- **Permissions:** Full access to all features

## User Access

The logged-in user has access to:
- **Organization IDs:** org-1, org-2, org-3, org-4, org-5
- **All Event IDs:** Access to all events across all organizations

## Usage in Code

### Import User Data
```typescript
import { currentUser, loginCredentials, authenticateUser } from '@/data/users'
```

### Authenticate User
```typescript
const user = authenticateUser('admin@techinnovators.com', 'admin123')
if (user) {
    console.log('Login successful:', user.name)
}
```

### Access Current User
```typescript
import { currentUser } from '@/data/users'

console.log('Current user:', currentUser.name)
console.log('User role:', currentUser.role)
console.log('Organization:', currentUser.organizationId)
```

### Check Event Access
```typescript
import { hasEventAccess } from '@/data/users'

if (hasEventAccess('conf-event-1')) {
    console.log('User has access to this event')
}
```

### Check Organization Access
```typescript
import { hasOrganizationAccess } from '@/data/users'

if (hasOrganizationAccess('org-1')) {
    console.log('User has access to this organization')
}
```

## Integration with Login Form

Update your login form to use the authentication:

```typescript
import { authenticateUser } from '@/data/users'
import { useUserStore } from '@/store/user.store'
import { initializePermissions } from '@/lib/store-helpers'

const handleLogin = async (email: string, password: string) => {
    // Authenticate
    const user = authenticateUser(email, password)
    
    if (user) {
        // Set user in store
        useUserStore.getState().setUser(user)
        
        // Initialize permissions
        initializePermissions(user.role, user.organizationId)
        
        // Navigate to dashboard
        navigate('/organization-dashboard')
    } else {
        // Show error
        console.error('Invalid credentials')
    }
}
```

## Auto-Fill for Development

Auto-fill login form in development mode:

```typescript
import { loginCredentials } from '@/data/users'

useEffect(() => {
    if (import.meta.env.DEV) {
        setEmail(loginCredentials.email)
        setPassword(loginCredentials.password)
    }
}, [])
```

## User Data Structure

```typescript
{
    id: "user-1",
    name: "John Doe",
    email: "admin@techinnovators.com",
    role: "super_admin",
    avatar: "/avatars/john-doe.jpg",
    organizationId: "org-1",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2026-01-14T00:00:00Z"
}
```
