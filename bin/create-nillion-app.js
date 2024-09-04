#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function installNilup() {
  console.log("Installing nilup...");
  execSync("curl -fsSL https://nilup.nilogy.xyz/install.sh | sh", {
    stdio: "inherit",
  });
  execSync("nilup install latest", { stdio: "inherit" });
  execSync("nilup use latest", { stdio: "inherit" });
  execSync("nilup init", { stdio: "inherit" });
}

function createNextJsProject(projectName) {
  console.log("Creating Next.js project...");
  execSync(
    `npx create-next-app@latest ${projectName} --typescript --eslint --app --src-dir --use-npm`,
    { stdio: "inherit" }
  );
  process.chdir(projectName);
  execSync("npm install -P @nillion/client-react-hooks@latest", {
    stdio: "inherit",
  });
}

function setupNillionFolder() {
  console.log("Setting up Nillion folder...");
  fs.mkdirSync("nillion", { recursive: true });
  const readmePath = path.join("nillion", "README.md");
  fs.writeFileSync(
    readmePath,
    "# Nillion SDK\n\nThis folder contains the Nillion SDK files."
  );
}

function updatePackageJson() {
  const packageJsonPath = "package.json";
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.scripts = {
    ...packageJson.scripts,
    "nillion:update":
      "nilup update && nilup install latest && nilup use latest",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function main() {
  const projectName = process.argv[2] || "nillion-app";

  installNilup();
  createNextJsProject(projectName);
  setupNillionFolder();
  updatePackageJson();

  console.log(`Nillion app "${projectName}" has been created successfully!`);
}

main();
