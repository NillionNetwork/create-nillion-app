#!/usr/bin/env node

import fs from "fs";
import { displayLogo } from "./functions/displayLogo.js";
import { displayWelcomeMessage } from "./functions/displayWelcomeMessage.js";
import { isNilupInstalled } from "./functions/isNilupInstalled.js";
import { installNilup } from "./functions/installNilup.js";
import { createNextJsProject } from "./functions/createNextJsProject.js";
import { promptForProjectName } from "./functions/nameRepo.js";
import { installDependencies } from "./functions/installRepoPackage.js";
import open from "open";

async function main() {
  displayLogo();
  displayWelcomeMessage();

  const projectName = await promptForProjectName();
  console.log("--------------------");
  console.log(`Creating project: ${projectName}`);
  console.log("--------------------");
  console.log("Checking if Nilup is installed...");

  if (!isNilupInstalled()) {
    installNilup();
  }

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
}

main().catch((err) => {
  console.error("Unexpected error. Please report it as a bug:");
  console.error(err);
});
