import { execSync } from "child_process";

export function setupNadaFolder(rootDir: string): void {
  console.log("Setting up Nada project...");

  execSync("nada init nada", { stdio: "inherit" });

  execSync("cd nada && python3 -m venv .venv", { stdio: "inherit" });

  console.log("Python venv created");

  process.chdir(rootDir);
}
