"use server";

import cleanCache from "../helpers/functions/cleanCache.js";
import filterDuplicates from "../helpers/functions/filterDuplicates.js";

import { LOG_MESSAGES } from "../helpers/messages.js";

import { config } from "../config.js";


// Queue to collect all logs
let logQueue = [];
let timer = null;

// Global cache to track recent logs with timestamps
let recentLogs = new Map(); // key: stringified args, value: timestamp


// Process all queued logs
const processQueue = () => {
  if (logQueue.length === 0) return;

  // Clean expired entries first
  cleanCache(recentLogs, config.cacheExpiryMs);

  // Filter duplicates if needed
  const logsToProcess = filterDuplicates(
    logQueue,
    recentLogs,
    config.allowDuplicates
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
  timer = setTimeout(processQueue, config.debounceDelayMs);
}
