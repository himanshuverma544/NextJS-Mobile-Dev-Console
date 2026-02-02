// services as raw functions usage
import logToTerminal from "./services/logToTerminal.js";
import logToFile from "./services/logToFile.js";

// hook for client components with server logging, for keeping safe from hydration errors
import useDebug from "./hooks/useDebug.js";

// configuration
import { initDebug } from "./config.js";


const debug = {
  terminal: logToTerminal,
  file: logToFile,
};


export {
  debug,
  useDebug,
  initDebug
};


