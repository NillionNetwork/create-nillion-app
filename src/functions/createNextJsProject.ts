import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export function createNextJsProject(rootDir: string): void {
  console.log("--------------------");
  console.log("Cloning Next.js project...");
  const nextAppPath: string = path.join(rootDir, "nillion-app");
  fs.mkdirSync(nextAppPath, { recursive: true });
  process.chdir(nextAppPath);

  console.log("Note: Degit is used to clone the Next.js project.");
  execSync("npx degit NillionNetwork/client-ts/examples/nextjs .", {
    stdio: "inherit",
  });
  process.chdir(rootDir);
}