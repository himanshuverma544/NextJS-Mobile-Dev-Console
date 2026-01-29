export default function filterDuplicates(queue, recentLogs, allowDuplicates) {

  if (allowDuplicates) {
    return queue;
  }

  const now = Date.now();

  return queue.filter(args => {

    const key = JSON.stringify(args);

    if (recentLogs.has(key)) {
      return false; // Skip - already logged recently
    }

    // Add to cache with current timestamp
    recentLogs.set(key, now);
    
    return true;
  });
}
