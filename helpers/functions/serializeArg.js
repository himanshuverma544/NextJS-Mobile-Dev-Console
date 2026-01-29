export default function serializeArg(arg) {

  // Safely serialize any value for logging

  if (arg instanceof Error) {
    return {
      name: arg.name,
      message: arg.message,
      stack: arg.stack,
    };
  }

  if (typeof arg === "bigint") {
    return `${arg}n`;
  }

  try {
    return JSON.parse(JSON.stringify(arg));
  }
  catch (_err) {
    return String(arg);
  }
}
