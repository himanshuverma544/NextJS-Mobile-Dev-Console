// services as raw functions usage
import logToTerminal from "@/app/actions/logging/services/logToTerminal.js";
import logToFile from "@/app/actions/logging/services/logToFile.js";

// hook for client components with server logging, for keeping safe from hydration errors
import useDebug from "@/app/actions/logging/hooks/useDebug.js";


const debug = {
  terminal: logToTerminal,
  file: logToFile,
};


export {
  debug,
  useDebug
};


