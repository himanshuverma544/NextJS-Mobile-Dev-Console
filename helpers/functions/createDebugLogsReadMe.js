import fs from "fs";
import path from "path";
import { README_CONTENT } from "../messages.js";


export default function createReadme(dirPath) {
  
  const readmePath = path.join(dirPath, 'README.md');
  
  // Only create if it doesn't exist
  if (fs.existsSync(readmePath)) {
    return;
  }

  fs.writeFileSync(readmePath, README_CONTENT, { encoding: "utf8" });
}
