import path from "path";


export const DUPLICATE_CONFIG = {
  ALLOW_DUPLICATES: false,        // true: allow duplicates, false: prevent duplicates
  CACHE_EXPIRY_MS: 3000,          // How long to remember logs for deduplication (ms)
  DEBOUNCE_DELAY_MS: 1000,        // Wait time before processing queued logs (ms)
};


// Allow duplicate logs across HMR remounts in useDebug hook
export const ALLOW_HMR_DUPLICATES = false;


export const LOG_FILE_PATH = path.join(
  process.cwd(), "src/app/actions/logging/logs/logs-file.json"
);
