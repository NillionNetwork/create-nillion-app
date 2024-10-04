import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setupNadaFolder } from "./setupNadaFolder.js";

export function createNextJsProject(rootDir: string): void {
  console.log("--------------------");
  console.log("Creating Next.js project... ");
  console.log("This should take ~ 1 minute. Feel free to go stretch you legs / grab a coffee ☕️");
  const nextAppPath: string = path.join(rootDir);

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const examplesPath = path.join(currentDir, "..", "..", "examples", "nextjs");

  if (!fs.existsSync(examplesPath)) {
    throw new Error(`Next.js example not found at ${examplesPath}`);
  }

  fs.cpSync(examplesPath, nextAppPath, { recursive: true });

  setupNadaFolder(process.cwd());

  console.log(`Next.js project created successfully at ${nextAppPath}!`);
  console.log("--------------------");
}
