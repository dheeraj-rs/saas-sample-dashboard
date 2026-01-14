# Authentication Service Integration

## Overview

The authentication service connects your login user data (`/src/data/users.ts`) with the application's authentication flow.

## Files

- **Auth Service:** `/src/services/auth.service.ts`
- **User Data:** `/src/data/users.ts`
- **User Store:** `/src/store/user.store.ts`

## Login Credentials

```
Email: admin@gmail.com
Password: password
```

## Usage in Login Form

### Import the Service

```typescript
import { login, logout } from '@/services/auth.service'
```

### Login Function

```typescript
const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password)
    
    if (response.success) {
        // Login successful
        console.log('Logged in as:', response.user?.name)
        navigate('/organization-dashboard')
    } else {
        // Login failed
        console.error(response.error)
        setError(response.error)
    }
}
```

### Logout Function

```typescript
const handleLogout = () => {
    logout()
    navigate('/login')
}
```

### Check Authentication

```typescript
import { isAuthenticated, getCurrentUser } from '@/services/auth.service'

if (isAuthenticated()) {
    const user = getCurrentUser()
    console.log('Current user:', user?.name)
}
```

## Auto-Login for Development

For faster development, you can auto-login:

```typescript
import { autoLoginDev } from '@/services/auth.service'

useEffect(() => {
    // Auto-login in development mode
    autoLoginDev().then(response => {
        if (response.success) {
            navigate('/organization-dashboard')
        }
    })
}, [])
```

## Integration Example

### Complete Login Form Component

```typescript
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '@/services/auth.service'
import { loginCredentials } from '@/data/users'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Auto-fill in development
    useEffect(() => {
        if (import.meta.env.DEV) {
            setEmail(loginCredentials.email)
            setPassword(loginCredentials.password)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const response = await login(email, password)

        if (response.success) {
            navigate('/organization-dashboard')
        } else {
            setError(response.error || 'Login failed')
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}
```

## What Happens on Login

1. **Authenticate:** Validates email/password against user data
2. **Set User:** Stores user in `useUserStore`
3. **Initialize Permissions:** Sets up permissions based on user role
4. **Set Organization Context:** Sets primary organization in `useAppContextStore`
5. **Return Response:** Returns success with user data or error message

## What Happens on Logout

1. **Clear User Store:** Removes user data
2. **Clear App Context:** Resets dashboard context
3. **Redirect:** Navigate user to login page

## Protected Routes

Use authentication check in your routes:

```typescript
import { isAuthenticated } from '@/services/auth.service'
import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children
}
```

## Session Management

The user session includes:
- **User Data:** Name, email, role, avatar
- **Organization Access:** Array of organization IDs
- **Event Access:** Array of event IDs
- **JWT Tokens:** `exp` (expiration), `iat` (issued at)

## Next Steps

1. Update your login form component to use `login()` from auth service
2. Add logout button that calls `logout()`
3. Implement protected routes using `isAuthenticated()`
4. Optional: Enable auto-login for development
