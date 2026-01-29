export default function cleanCache(recentLogs, cacheExpiryMs) {

  const now = Date.now();

  for (const [key, timestamp] of recentLogs.entries()) {
    
    if (now - timestamp > cacheExpiryMs) {
      recentLogs.delete(key);
    }
  }
}
