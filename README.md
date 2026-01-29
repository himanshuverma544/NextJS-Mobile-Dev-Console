# Makeshift Mobile Dev Console

**Version:** 1.0.0

## Table of Contents
- [Why This Exists](#why-this-exists)
- [Tested On](#tested-on)
- [Usage](#usage)
  - [Raw Functions](#raw-functions-debugterminal--debugfile)
  - [Hook (useDebug)](#hook-usedebug)
  - [Simple Examples](#simple-examples)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)

---

## Why This Exists

My laptop died while job hunting, and getting a new one wasn't in my favor. So here I'm, coding on my phone. Ever tried debugging on mobile? Mobile browser dev tools might as well not exist. So I built this module, my makeshift dev-console that dumps everything to the terminal and files.

**Pro tip:** For the best mobile dev experience, use **screen mirroring + external mouse and keyboard**, and run your code on **GitHub Codespaces** for proper CPU power. Game changer.

Happy Coding :)

---

## Tested On:

Next.js 14.2.6, might not work with other libraries\frameworks and versions.


## Usage

### Raw Functions (`debug.terminal` / `debug.file`)

Use these **everywhere** except during the component rendering phase:

```javascript
import { debug } from "@/app/actions/logging";

// ✅ Event handlers
onClick={() => debug.terminal("Button clicked")}

// ✅ useEffect
useEffect(() => {
  debug.terminal("Component mounted");
  debug.file("User data:", userData);
}, []);

// ✅ API calls
async function fetchData() {
  debug.terminal("Fetching data...");
  const data = await fetch("/api/data");
  debug.file("Response:", data);
}

// ✅ Server actions
export async function handleSubmit(formData) {
  debug.terminal("Form submitted");
  debug.file("Form data:", formData);
}

// ❌ NOT during render
function Component() {
  debug.terminal("Rendering..."); // This will cause hydration errors!
  return <div>Hello</div>;
}
```


### Hook (`useDebug`)

Use the **hook only for rendering phase logging** to avoid hydration errors:

```javascript
import { useDebug } from "@/app/actions/logging";

function Component() {
  const log = useDebug();
  
  // ✅ Safe during render - logs after mount
  log.terminal("Component rendered");
  log.file("Props:", props);
  
  return <div>Hello</div>;
}
```


### Simple Examples

**Basic logging:**
```javascript
debug.terminal("Hello world");
debug.file("User logged in");
```

**With multiple arguments:**
```javascript
debug.terminal("User:", userId, "Action:", action);
debug.file("Order:", orderId, "Total:", total);
```

**With objects:**
```javascript
debug.terminal("Cart state:", { items, total, discount });
debug.file("API response:", response);
```


## Configuration

Customize behavior in `config.js`:

```javascript
// Duplicate prevention for terminal/file logging
DUPLICATE_CONFIG: {
  ALLOW_DUPLICATES: false,     // false = prevent duplicates within cache window
  CACHE_EXPIRY_MS: 3000,       // How long to remember logs (ms)
  DEBOUNCE_DELAY_MS: 1000,     // Batch delay before processing (ms)
}

// HMR duplicate prevention for useDebug hook
ALLOW_HMR_DUPLICATES: false    // false = log once per session even with HMR
```


## Directory Structure

```
logging/
│
├── config.js                          # Configuration settings
├── index.js                           # Public API exports
├── README.md                          # This file
│
├── hooks/
│   └── useDebug.js                    # React hook for rendering phase
│
├── services/
│   ├── logToTerminal.js               # Terminal output handler
│   └── logToFile.js                   # File output handler
│
├── helpers/
│   ├── messages.js                    # Centralized display messages
│   └── functions/
│       ├── cleanCache.js              # Cache cleanup utility
│       ├── filterDuplicates.js        # Duplicate filtering logic
│       ├── formatTime.js              # Timestamp formatter
│       └── serializeArg.js            # Argument serializer for file output
│
└── logs/
    └── logs-file.json                 # Persistent log storage
```

---

**Output:** Logs appear in terminal with `[BROWSER]:` prefix and are saved to `logs/logs-file.json` with timestamps and IDs.