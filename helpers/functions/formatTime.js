export default function formatTime() {

  // Force IST (Asia/Kolkata) so logs align with India local time
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

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
