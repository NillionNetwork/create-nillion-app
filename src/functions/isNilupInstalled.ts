import { execSync } from "child_process";
import { installNilup } from "./installNilup.js";

export async function isNilupInstalled() {
  try {
    const output = execSync("nilup -V", { stdio: "pipe" }).toString().trim();
    console.log(`Nilup is already installed. Version: ${output}`);
  } catch (error: unknown) {
    console.log("Nilup is not installed.", error);
    await installNilup();
  }
}
