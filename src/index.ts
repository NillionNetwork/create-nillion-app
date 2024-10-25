#!/usr/bin/env node

import fs from "fs";
import open from "open";

import { displayLogo } from "./functions/displayLogo.js";
import { displayWelcomeMessage } from "./functions/displayWelcomeMessage.js";
import { isNilupInstalled } from "./functions/isNilupInstalled.js";
import { installNilup } from "./functions/installNilup.js";
import { createNextJsProject } from "./functions/createNextJsProject.js";
import { promptForProjectName } from "./functions/nameRepo.js";
import { installRepoPackage } from "./functions/installRepoPackage.js";
import {
  isDockerInstalled,
  wouldPreferDocker,
  noDocker,
  createProject,
} from "./functions/dockerInstead.js";

async function main() {
  displayLogo();
  displayWelcomeMessage();

  const projectName = await promptForProjectName();
  console.log("--------------------");
  console.log(`Creating project: ${projectName}`);
  const useDocker = await wouldPreferDocker();
  let instructions;

  if (useDocker) {
    console.log("--------------------");
    console.log("Checking if Docker is installed...");
    if (!isDockerInstalled()) noDocker();

    fs.mkdirSync(projectName, { recursive: true });
    process.chdir(projectName);
    createProject(useDocker, projectName, process.cwd());
    console.log("Docker build completed!");
    instructions =
      "Run `npm run docker:build` followed by `npm run docker:up`, then open `localhost:3000` in your browser to see your new project.\nPlease check https://github.com/NillionNetwork/create-nillion-app/blob/main/docker.md to learn more how to use Docker in this project.";
  } else {
    console.log("--------------------");
    console.log("Checking if Nilup is installed...");

    if (!isNilupInstalled()) {
      installNilup();
    }

    fs.mkdirSync(projectName, { recursive: true });
    process.chdir(projectName);
    createNextJsProject(process.cwd());
    await installRepoPackage();
    instructions =
      "Run `npm run dev` inside your project's folder and open `localhost:3000` in your browser to see your new project.";
  }

  console.log("--------------------");
  console.log(`Nillion quickstart has been created successfully! 🚀`);
  console.log(instructions);
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
