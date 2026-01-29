"use server";

import cleanCache from "@/app/actions/logging/helpers/functions/cleanCache.js";
import filterDuplicates from "@/app/actions/logging/helpers/functions/filterDuplicates.js";

import { LOG_MESSAGES } from "@/app/actions/logging/helpers/messages.js";

import { DUPLICATE_CONFIG } from "@/app/actions/logging/config.js";


// Queue to collect all logs
let logQueue = [];
let timer = null;

// Global cache to track recent logs with timestamps
let recentLogs = new Map(); // key: stringified args, value: timestamp


// Process all queued logs
const processQueue = () => {
  if (logQueue.length === 0) return;

  // Clean expired entries first
  cleanCache(recentLogs, DUPLICATE_CONFIG.CACHE_EXPIRY_MS);

  // Filter duplicates if needed
  const logsToProcess = filterDuplicates(
    logQueue,
    recentLogs,
    DUPLICATE_CONFIG.ALLOW_DUPLICATES
  );

  // Log all collected logs
  logsToProcess.forEach(args => {
    console.log(`\n${LOG_MESSAGES.TERMINAL.PREFIX}`, ...args, "\n");
  });

  // Clear the queue
  logQueue = [];
};


export default async function logToTerminal(...args) {
  // Add to queue
  logQueue.push(args);

  // Reset timer - wait for required time
  clearTimeout(timer);
  timer = setTimeout(processQueue, DUPLICATE_CONFIG.DEBOUNCE_DELAY_MS);
}
