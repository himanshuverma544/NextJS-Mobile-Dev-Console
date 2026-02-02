"use server";

import fs from "fs";
import path from "path";

import formatTime from "../helpers/functions/formatTime.js";
import serializeArg from "../helpers/functions/serializeArg.js";
import cleanCache from "../helpers/functions/cleanCache.js";
import filterDuplicates from "../helpers/functions/filterDuplicates.js";

import { LOG_MESSAGES } from "../helpers/messages.js";

import { config } from "../config.js";


// Queue to collect all log entries
let logQueue = [];
let timer = null;

// Global cache to track recent logs with timestamps
let recentLogs = new Map(); // key: stringified args, value: timestamp


// Process all queued logs
const processQueue = () => {
  if (logQueue.length === 0) return;

  // Clean expired entries first
  cleanCache(recentLogs, config.cacheExpiryMs);

  try {
    // Ensure directory exists
    const logDir = path.dirname(config.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Read existing logs
    let logs = [];
    let maxId = 0;

    if (fs.existsSync(config.logFilePath)) {
      const fileContent = fs.readFileSync(config.logFilePath, { encoding: "utf8" });
      
      if (fileContent.trim()) {
        logs = JSON.parse(fileContent);
        // Find the highest id
        maxId = logs.reduce((max, log) => Math.max(max, log.id || 0), 0);
      }
    }

    // Filter duplicates if needed
    const logsToWrite = filterDuplicates(
      logQueue,
      recentLogs,
      config.allowDuplicates
    );

    // Create log entries with timestamps after deduplication
    const logEntries = logsToWrite.map(args => ({
      id: null,  // Will be set below
      timestamp: formatTime(config.timezone),
      log: args.map(serializeArg),
    }));

    // Add IDs and prepend all new logs
    logEntries.reverse().forEach(logEntry => {
      maxId++;
      logEntry.id = maxId;
      logs.unshift(logEntry);
    });

    // Write entire array back once
    fs.writeFileSync(config.logFilePath, JSON.stringify(logs, null, 2), { encoding: "utf8" });

    const fileName = config.logFilePath.split('/').pop();
    console.log(LOG_MESSAGES.FILE.WRITE_SUCCESS(logEntries.length, fileName));
  }
  catch (error) {
    console.error(LOG_MESSAGES.FILE.WRITE_ERROR, error);
  }

  // Clear the queue
  logQueue = [];
};


export default async function logToFile(...args) {
  // Add just the args to queue, create entry with timestamp later during processing
  logQueue.push(args);

  // Reset timer - wait for required time
  clearTimeout(timer);
  timer = setTimeout(processQueue, config.debounceDelayMs);
}
