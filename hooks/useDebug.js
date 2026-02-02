"use client";

import { useEffect, useRef } from "react";

import logToTerminal from "../services/logToTerminal.js";
import logToFile from "../services/logToFile.js";

import { config } from "../config.js";


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
      if (config.allowHmrDuplicates || !loggedTerminalKeys.has(key)) {

        logToTerminal(...terminalArgsRef.current);

        if (!config.allowHmrDuplicates) {
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
      if (config.allowHmrDuplicates || !loggedFileKeys.has(key)) {

        logToFile(...fileArgsRef.current);

        if (!config.allowHmrDuplicates) {
          loggedFileKeys.add(key);
        }
      }
      
      fileArgsRef.current = null;
    }
  }, []);


  return debug;
}