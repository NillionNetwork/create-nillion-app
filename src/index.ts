#!/usr/bin/env node
import fs from "fs";
import { displayLogo } from "./functions/displayLogo.js";
import { displayWelcomeMessage } from "./functions/displayWelcomeMessage.js";
import { createNextJsProject } from "./functions/createNextJsProject.js";
import { promptForProjectName } from "./functions/nameRepo.js";
import { installDependencies } from "./functions/installRepoPackage.js";
import open from "open";
import { isNilupInstalled } from "./functions/isNilupInstalled.js";

async function main() {
  displayLogo();
  displayWelcomeMessage();
  const projectName = await promptForProjectName();
  console.log("--------------------");
  console.log(`Creating project: ${"\x1b[34m" + projectName + "\x1b[0m"}`);
  console.log("--------------------");
  try {
    console.log("Checking if Nilup is installed...");
    await isNilupInstalled();

    fs.mkdirSync(projectName, { recursive: true });
    process.chdir(projectName);

    createNextJsProject(process.cwd());
    await installDependencies();

    console.log("--------------------");
    console.log(`Nillion quickstart has been created successfully! 🚀`);
    console.log(
      `Cd into your repo + run "npm run dev" and open localhost:3000 in your browser to see your new project.`,
    );
    console.log("--------------------");

    console.log(`Follow the rest of the Quickstart Guide to get started!`);
    console.log("Opening the Nillion Quickstart Guide in your browser...");
    open("https://github.com/NillionNetwork/awesome-nillion/issues/2");
    console.log("--------------------");
  } catch (error) {
    console.error("An error occurred during the setup process:", error);
    process.exit(1);
  }
}
main().catch((err) => {
  console.error("Unexpected error. Please report it as a bug:");
  console.error(err);
});
