#!/usr/bin/env node

import fs from "fs";
// import chalk from 'chalk';
import { displayLogo } from "./functions/displayLogo.js";
import { displayWelcomeMessage } from "./functions/displayWelcomeMessage.js";
import { isNilupInstalled } from "./functions/isNilupInstalled.js";
import { installNilup } from "./functions/installNilup.js";
import { setupNadaFolder } from "./functions/setupNadaFolder.js";
import { createNextJsProject } from "./functions/createNextJsProject.js";

async function main() {
  //TODO: Add in steps to name the respective folders
  const projectName = "nillion-quickstart";

  displayLogo();
  displayWelcomeMessage();

  console.log("Checking if Nilup is installed...");
  if (!isNilupInstalled()) {
    installNilup();
  }

  fs.mkdirSync(projectName, { recursive: true });
  process.chdir(projectName);

  setupNadaFolder(process.cwd());
  createNextJsProject(process.cwd());

  // TODO: Add more step for venvs / nillion-devnet

  // Add next steps
  console.log("--------------------");
  console.log(`Nillion quickstart has been created successfully! 🚀`);
  console.log(`Follow the rest of the Documenation Quickstart to get started!`);
  console.log("--------------------");
}

main().catch((err) => {
  console.error("Unexpected error. Please report it as a bug:");
  console.error(err);
});
