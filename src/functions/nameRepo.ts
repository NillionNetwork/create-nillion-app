import readline from "readline";

export function promptForProjectName(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "What would you like to name your project? (default: nillion-quickstart): ",
      (answer) => {
        rl.close();
        const projectName = answer.trim() || "nillion-quickstart";
        if (/^([A-Za-z-_0-9])+$/.test(projectName)) {
          resolve(projectName);
        } else {
          console.log("Invalid project name. Using default: nillion-quickstart");
          resolve("nillion-quickstart");
        }
      },
    );
  });
}
