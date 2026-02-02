# Usage Examples

## Basic Setup

### 1. Install the package
```bash
npm install nextjs-mobile-dev-console
```

### 2. Initialize in your app (optional)

**For App Router (Next.js 13+):**
```javascript
// app/layout.js
import { initDebug } from "nextjs-mobile-dev-coole";

// Configure once (optional - uses sensible defaults)
initDebug({
  allowDuplicates: false,
  cacheExpiryMs: 3000,
  debounceDelayMs: 1000,
  allowHmrDuplicates: false,
  logFilePath: "./debug-logs/debug.json",
  timezone: "Asia/Kolkata"  // specify timezone (default: system timezone)
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**For Pages Router (Next.js 12 and below):**
```javascript
// pages/_app.js
import { initDebug } from "nextjs-mobile-dev-console";

initDebug({
  allowDuplicates: false,
  cacheExpiryMs: 3000,
});

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Usage Examples

### Example 1: Server Actions
```javascript
// app/actions.js
"use server";

import { debug } from "nextjs-mobile-dev-console";

export async function createUser(formData) {
  const name = formData.get("name");
  
  debug.terminal("Creating user:", name);
  
  try {
    const user = await db.user.create({ name });
    debug.file("User created successfully:", user);
    return { success: true, user };
  } catch (error) {
    debug.file("Error creating user:", error);
    return { success: false, error: error.message };
  }
}
```

### Example 2: API Routes
```javascript
// app/api/users/route.js
import { debug } from "nextjs-mobile-dev-console";

export async function GET(request) {
  debug.terminal("GET /api/users called");
  
  const users = await fetchUsers();
  
  debug.file("Fetched users:", {
    count: users.length,
    users: users
  });
  
  return Response.json(users);
}
```

### Example 3: Client Components (Event Handlers)
```javascript
// app/components/Button.js
"use client";

import { debug } from "nextjs-mobile-dev-console";

export default function Button() {
  const handleClick = async () => {
    debug.terminal("Button clicked");
    
    const response = await fetch("/api/data");
    const data = await response.json();
    
    debug.file("API response:", data);
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### Example 4: Client Components (Render Phase) - Use Hook!
```javascript
// app/components/UserProfile.js
"use client";

import { useDebug } from "nextjs-mobile-dev-console";

export default function UserProfile({ user }) {
  const log = useDebug();
  
  // Safe to log during render - happens after mount
  log.terminal("UserProfile rendered");
  log.file("User data:", user);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Example 5: useEffect Hook
```javascript
"use client";

import { useEffect } from "react";
import { debug } from "nextjs-mobile-dev-console";

export default function Dashboard() {
  useEffect(() => {
    debug.terminal("Dashboard mounted");
    
    const loadData = async () => {
      const data = await fetchDashboardData();
      debug.file("Dashboard data loaded:", data);
    };
    
    loadData();
  }, []);
  
  return <div>Dashboard</div>;
}
```

### Example 6: Complex Objects and Errors
```javascript
import { debug } from "nextjs-mobile-dev-console";

// Log complex objects
debug.file("Cart state:", {
  items: [
    { id: 1, name: "Product A", price: 29.99 },
    { id: 2, name: "Product B", price: 49.99 }
  ],
  total: 79.98,
  discount: 10,
  user: { id: 123, name: "John" }
});

// Log errors with full stack trace
try {
  throw new Error("Something went wrong");
} catch (error) {
  debug.terminal("Error occurred:", error.message);
  debug.file("Full error details:", error);
}

// Log BigInt values
const bigNumber = 9007199254740991n;
debug.file("Big number:", bigNumber);
```

### Example 7: Debugging Authentication
```javascript
// middleware.js
import { debug } from "nextjs-mobile-dev-console";

export function middleware(request) {
  const token = request.cookies.get("token");
  
  debug.terminal("Middleware check:", request.nextUrl.pathname);
  debug.file("Auth token:", token ? "Present" : "Missing");
  
  if (!token) {
    debug.terminal("Redirecting to login");
    return NextResponse.redirect("/login");
  }
  
  return NextResponse.next();
}
```

### Example 8: Form Submissions
```javascript
"use client";

import { debug } from "nextjs-mobile-dev-console";
import { createUser } from "./actions";

export default function UserForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    debug.terminal("Form submitted");
    debug.file("Form data:", Object.fromEntries(formData));
    
    const result = await createUser(formData);
    
    debug.file("Server response:", result);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Configuration Examples

### Custom Log Path
```javascript
import { initDebug } from "nextjs-mobile-dev-console";

initDebug({
  logFilePath: "./debug/my-logs.json"
});
```

### Allow Duplicates
```javascript
import { initDebug } from "nextjs-mobile-dev-console";

initDebug({
  allowDuplicates: true  // Log everything, even duplicates
});
```

### Faster Logging (Less Debouncing)
```javascript
import { initDebug } from "nextjs-mobile-dev-console";

initDebug({
  debounceDelayMs: 500,  // Log faster (default: 1000ms)
  cacheExpiryMs: 2000    // Shorter cache window (default: 3000ms)
});
```

### Development vs Production
```javascript
import { initDebug } from "nextjs-mobile-dev-console";

// isDev is auto-detected, but you can also configure based on it
initDebug({
  allowDuplicates: config.isDev,        // Allow duplicates in dev
  debounceDelayMs: config.isDev ? 500 : 1500,  // Faster in dev
  logFilePath: config.isDev 
    ? "./debug-logs/dev-logs.json" 
    : "./debug-logs/prod-logs.json"
});

// Or ovehjkh({
  isDev: true  // Force development mode
});
```

### Custom Timezone
```javascript
import { initDebug } from "nextjs-mobile-dev-console";

// If your server is in US but you want IST timestamps
initDebug({
  timezone: "Asia/Kolkata"  // India
});

// Or any other timezone
initDebug({
  timezone: "America/New_York"  // US Eastern
});
```

## Tips & Best Practices

### ✅ DO:
- Use `debug.terminal()` and `debug.file()` in event handlers, useEffect, and server actions
- Use `useDebug()` hook for logging during component render phase
- Initialize config once in root layout or _app.js
- Use descriptive log messages
- Log important state changes and API responses

### ❌ DON'T:
- Don't use `debug.terminal()` or `debug.file()` directly during component render
- Don't log sensitive data like passwords or API keys
- Don't log excessively in production (configure appropriately)
- Don't forget to add `debug-logs/` to your `.gitignore`

### Viewing Logs

**Terminal logs:**
Look in your Next.js dev server terminal - they appear with `[BROWSER]:` prefix

**File logs:**
Check `./debug-logs/logs-file.json` (or your custom path) - it's a JSON file with timestamps and IDs

## Troubleshooting

### Logs not appearing?
- Check your terminal output for `[BROWSER]:` prefix
- Verify `./debug-logs/logs-file.json` exists and is being written to
- Make sure you're not blocking with duplicate prevention

### Hydration errors?
- Use `useDebug()` hook for render-phase logging
- Don't use `debug.terminal()` or `debug.file()` during render

### Too many duplicate logs?
- Leave `allowDuplicates: false` (default)
- Increase `cacheExpiryMs` to remember logs longer

### Logs appearing multiple times on HMR?
- Set `allowHmrDuplicates: false` (default)
