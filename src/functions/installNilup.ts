import { exec, ExecException } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

interface ExecError extends ExecException {
  stdout?: string;
  stderr?: string;
}

export async function installNilup() {
  console.log("--------------------");
  console.log("Installing nilup... This may take a few minutes.🙏 ");

  try {
    await execAsync("curl https://nilup.nilogy.xyz/install.sh | sh", {
      shell: process.env.SHELL || "/bin/sh",
      env: { ...process.env, FORCE_COLOR: "1" },
    });
  } catch (error: unknown) {
    const execError = error as ExecError;
    // Strange here: errors even on successful installation so extra catch.
    if (execError.stderr && execError.stderr.includes("You may begin using nilup now!")) {
      console.log("Nilup installed or updated successfully!");
      console.log("Please source your shell configuration to update your environment:");
		  console.log("For Bash users: source ~/.bashrc");
		  console.log("Or, you can simply restart your terminal session to apply changes.");
    } else {
      console.error("Failed to install Nilup. Error details:", execError.message);
      if (execError.stdout) console.error("stdout:", execError.stdout);
      if (execError.stderr) console.error("stderr:", execError.stderr);
      throw error;
    }
  }
}
