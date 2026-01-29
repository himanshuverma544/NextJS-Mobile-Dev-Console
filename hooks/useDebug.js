"use client";

import { useEffect, useRef } from "react";

import logToTerminal from "@/app/actions/logging/services/logToTerminal.js";
import logToFile from "@/app/actions/logging/services/logToFile.js";

import { ALLOW_HMR_DUPLICATES } from "@/app/actions/logging/config.js";


const loggedTerminalKeys = new Set();
const loggedFileKeys = new Set();


export default function useDebug() {

  const terminalArgsRef = useRef(null);
  const fileArgsRef = useRef(null);

  
  const debug = {
    terminal: (...args) => {
      terminalArgsRef.current = args;
    },
    file: (...args) => {
      fileArgsRef.current = args;
    }
  };


  // Terminal logging - executes after render
  useEffect(() => {

    if (terminalArgsRef.current) {
      const key = JSON.stringify(terminalArgsRef.current);
      
      // Only log if not already logged (when HMR duplicate prevention is enabled)
      if (ALLOW_HMR_DUPLICATES || !loggedTerminalKeys.has(key)) {

        logToTerminal(...terminalArgsRef.current);

        if (!ALLOW_HMR_DUPLICATES) {
          loggedTerminalKeys.add(key);
        }
      }
      
      terminalArgsRef.current = null;
    }
  }, []);


  // File logging - executes after render
  useEffect(() => {

    if (fileArgsRef.current) {
      const key = JSON.stringify(fileArgsRef.current);
      
      // Only log if not already logged (when HMR duplicate prevention is enabled)
      if (ALLOW_HMR_DUPLICATES || !loggedFileKeys.has(key)) {

        logToFile(...fileArgsRef.current);

        if (!ALLOW_HMR_DUPLICATES) {
          loggedFileKeys.add(key);
        }
      }
      
      fileArgsRef.current = null;
    }
  }, []);


  return debug;
}