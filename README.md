# NextJS-Mobile-Dev-Console

**Version:** 1.1.3

## Table of Contents
- [Why This Exists](#why-this-exists)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Tested On](#tested-on)
- [Usage](#usage)
  - [Raw Functions](#raw-functions-debugterminal--debugfile)
  - [Hook (useDebug)](#hook-usedebug)
  - [Simple Examples](#simple-examples)
- [Configuration](#configuration)

---

## Why This Exists

My laptop died, and getting a new one wasn’t in my choice, so picked up my Samsung S25, connected it with the screen (used Samsung DeX), logged myself inside GitHub Codespaces, and started coding. Saw DevTools and Inspect aren’t supported in mobile phone browsers, therefore built this package so I can simply see the logs inside the terminal or files. As simply seeing logs can help me debug and code. :)

This package itself is a proof, that the setup is reliable and works.

## Installation

```bash
npm install nextjs-mobile-dev-console
```

Or with yarn:
```bash
yarn add nextjs-mobile-dev-console
```

Or with pnpm:
```bash
pnpm add nextjs-mobile-dev-console
```

---

## Quick Start

**Use anywhere in your app**

```javascript
import { debug } from "nextjs-mobile-dev-console";

debug.terminal("Hello from Next.js!");
debug.file("User logged in:", userData);
```

```javascript
import { useDebug } from "nextjs-mobile-dev-console"; // use hook only at rendering phase

function Component() {
  const log = useDebug();
  
  // Safe during render - logs after mount
  log.terminal("Component rendered");
  log.file("Props:", props);
  
  return <div>Hello</div>;
}
```

---

## Tested On:

Next.js 14.2.6 and 15.x, might not work with other libraries\frameworks and versions.

---

## Usage

### Raw Functions (`debug.terminal` / `debug.file`)

Use these **everywhere** except during the component rendering phase:

```javascript
import { debug } from "nextjs-mobile-dev-console";

// Event handlers
onClick={() => debug.terminal("Button clicked")}

// useEffect
useEffect(() => {
  debug.terminal("Component mounted");
  debug.file("User data:", userData);
}, []);

// API calls
async function fetchData() {
  debug.terminal("Fetching data...");
  const data = await fetch("/api/data");
  debug.file("Response:", data);
}

// Server actions
export async function handleSubmit(formData) {
  debug.terminal("Form submitted");
  debug.file("Form data:", formData);
}

// NOT during render
function Component() {
  debug.terminal("Rendering..."); // This will cause hydration errors!
  return <div>Hello</div>;
}
```


### Hook (`useDebug`)

Use the **hook only for rendering phase logging** to avoid hydration errors:

```javascript
import { useDebug } from "nextjs-mobile-dev-console";

function Component() {
  const log = useDebug();
  
  // Safe during render - logs after mount
  log.terminal("Component rendered");
  log.file("Props:", props);
  
  return <div>Hello</div>;
}
```

**[See more examples, best practices, and troubleshooting →](EXAMPLES.md)**


## Configuration

### Option 1: Use `initDebug()` (Recommended)

Initialize once at app startup to customize behavior:

```javascript
// app/layout.js or pages/_app.js
import { initDebug } from "nextjs-mobile-dev-console";

initDebug({
  allowDuplicates: false,        // false = prevent duplicate logs (default: false)
  cacheExpiryMs: 5000,           // How long to remember logs in ms (default: 3000)
  debounceDelayMs: 1500,         // Batch delay before processing in ms (default: 1000)
  allowHmrDuplicates: true,      // Allow duplicates on HMR remounts (default: false)
  logFilePath: "./custom/path/logs.json",  // Custom log file path (default: ./debug-logs/logs.json)
  timezone: "Asia/Kolkata"   // Timezone for timestamps (default: system timezone)
});
```

**All options are optional** - omit any to use defaults.

### Option 2: Environment Variables

Set `LOG_FILE_PATH` in your `.env` file:

```bash
# .env.local
LOG_FILE_PATH=./custom/path/logs.json
```

### Common Timezones

By default, timestamps use your server's timezone. If your server is in a different timezone than you, specify it in `initDebug()`:

```javascript
initDebug({
  timezone: "Asia/Kolkata"      // India
  // timezone: "America/New_York"  // US Eastern
  // timezone: "America/Los_Angeles"  // US Pacific
  // timezone: "Europe/London"     // UK
  // timezone: "Asia/Tokyo"        // Japan
  // timezone: "Australia/Sydney"  // Australia
});
```

[Full list of timezones →](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

---

**Output:** Logs appear in terminal with `[BROWSER]:` prefix and are saved to `debug-logs/logs.json` with timestamps and IDs.
