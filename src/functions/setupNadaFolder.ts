import { execSync } from 'child_process';

export function setupNadaFolder(rootDir: string): void {
  console.log("Setting up Nada project...");

  execSync("nada init nada_quickstart_programs", { stdio: "inherit" });

  process.chdir(rootDir);
}