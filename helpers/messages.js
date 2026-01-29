export const LOG_MESSAGES = {
  TERMINAL: {
    PREFIX: "[BROWSER]:",
  },

  FILE: {
    WRITE_SUCCESS: (count, fileName) => `\nLogged ${count} ${count <= 1 ? "entry" : "entries"} to file: ${fileName}\n`,
    WRITE_ERROR: "Error writing to log file:",
  },
};
