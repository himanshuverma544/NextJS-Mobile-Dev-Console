export default function formatTime(timezone) {

  // Build options for date formatting
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Only add timeZone if specified, otherwise uses system timezone
  if (timezone) {
    options.timeZone = timezone;
  }

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(new Date());

  const map = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return (
    `${map.year}-` +
    `${map.month}-` +
    `${map.day}_` +
    `${map.hour}:` +
    `${map.minute}:` +
    `${map.second}`
  );
}
