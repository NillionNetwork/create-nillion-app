import { execSync } from "child_process";

export function isNilupInstalled(): boolean {
  try {
    const output = execSync("nilup -V", { stdio: "pipe" }).toString().trim();
    console.log(`Nilup is already installed. Version: ${output}`);
    return true;
  } catch (error: unknown) {
    return error instanceof Error;
  }
}
