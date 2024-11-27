import { execSync } from "child_process";
import { installNilup } from "./installNilup.js";

export async function isNilupInstalled() {
  try {
    const output = execSync("nilup -V", { stdio: "pipe" }).toString().trim();
    if (output !== "nilup v0.7.0") {
      await installNilup();
    } else {
      console.log(`Nilup is already installed. ${output}`);
    }
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = error; // Explicitly declare unused variable
    // console.log("Nilup is not installed.", error);
    await installNilup();
  }
}
