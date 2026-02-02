import path from "path";


// Default configuration
const DEFAULT_CONFIG = {
  allowDuplicates: false,        // true: allow duplicates, false: prevent duplicates
  cacheExpiryMs: 3000,          // How long to remember logs for deduplication (ms)
  debounceDelayMs: 1000,        // Wait time before processing queued logs (ms)
  allowHmrDuplicates: false,    // Allow duplicate logs across HMR remounts in useDebug hook
  logFilePath: process.env.LOG_FILE_PATH || path.join(process.cwd(), "debug-logs", "logs-file.json"),
  timezone: undefined,          // Timezone for timestamps (undefined = system timezone)
  isDev: process.env.NODE_ENV === "development",  // Auto-detect development mode
};


// Runtime configuration - can be updated via initDebug()
export const config = { ...DEFAULT_CONFIG };


// Initialize/update configuration
export function initDebug(userConfig = {}) {
  if (userConfig.allowDuplicates !== undefined) {
    config.allowDuplicates = userConfig.allowDuplicates;
  }
  if (userConfig.cacheExpiryMs !== undefined) {
    config.cacheExpiryMs = userConfig.cacheExpiryMs;
  }
  if (userConfig.debounceDelayMs !== undefined) {
    config.debounceDelayMs = userConfig.debounceDelayMs;
  }
  if (userConfig.allowHmrDuplicates !== undefined) {
    config.allowHmrDuplicates = userConfig.allowHmrDuplicates;
  }
  if (userConfig.logFilePath !== undefined) {
    config.logFilePath = userConfig.logFilePath;
  }
  if (userConfig.timezone !== undefined) {
    config.timezone = userConfig.timezone;
  }
  if (userConfig.isDev !== undefined) {
    config.isDev = userConfig.isDev;
  }
  
  return config;
}
