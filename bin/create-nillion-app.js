#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const nillionLogo = `
       _ _ _ _             
 _ __ (_) | (_) ___  _ __  
| '_ \\| | | | |/ _ \\| '_ \\ 
| | | | | | | | (_) | | | |
|_| |_|_|_|_|_|\\___/|_| |_|
                           
`;
function displayLogo() {
  console.log("\x1b[34m%s\x1b[0m", nillionLogo);
}

function displayWelcomeMessage() {
  const purpleText = "\x1b[34m";
  const resetColor = "\x1b[0m";
  console.log(
    `Welcome to ${purpleText}create-nillion-app${resetColor} - the quickstart Nillion CLI`
  );
}

function isNilupInstalled() {
  try {
    const output = execSync("nilup -V", { stdio: "pipe" }).toString().trim();
    console.log(`Nilup is already installed. Version: ${output}`);
    return true;
  } catch (error) {
    return false;
  }
}

function installNilup() {
  console.log("--------------------");
  console.log("Installing nilup... This may take a few minutes.🙏 ");
  execSync("curl -fsSL https://nilup.nilogy.xyz/install.sh | sh", {
    stdio: "inherit",
  });
  execSync("nilup install latest", { stdio: "inherit" });
  execSync("nilup use latest", { stdio: "inherit" });
  execSync("nilup init", { stdio: "inherit" });
}

function setupNadaFolder(rootDir) {
  console.log("Setting up Nada project...");

  execSync("nada init nada_quickstart_programs", { stdio: "inherit" });
  execSync("python3 -m venv .venv", { stdio: "inherit" });

  // Determine the correct activate script based on the OS
  const activateScript =
    process.platform === "win32"
      ? ".venv\\Scripts\\activate"
      : "source .venv/bin/activate";

  // Install nada-dsl
  execSync(`${activateScript} && pip install --upgrade nada-dsl`, {
    stdio: "inherit",
    shell: true,
  });

  process.chdir(rootDir);
}

function createNextJsProject(rootDir) {
  console.log("--------------------");
  console.log("Cloning Next.js project...");
  const nextAppPath = path.join(rootDir, "nillion-app");
  fs.mkdirSync(nextAppPath, { recursive: true });
  process.chdir(nextAppPath);

  console.log("Note: Degit is used to clone the Next.js project.");
  execSync("npx degit NillionNetwork/client-ts/examples/nextjs .", {
    stdio: "inherit",
  });
  process.chdir(rootDir);
}

function updatePackageJson(rootDir) {
  const packageJsonPath = path.join(rootDir, "nillion-app", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.scripts = {
    ...packageJson.scripts,
    "nillion:update":
      "nilup update && nilup install latest && nilup use latest",
    "nada:activate":
      process.platform === "win32"
        ? "cd ..\\nada_quickstart_programs && .venv\\Scripts\\activate"
        : "cd ../nada_quickstart_programs && source .venv/bin/activate",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function main() {
  const projectName = process.argv[2] || "nillion-quickstart";

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
  updatePackageJson(process.cwd());

  console.log(
    `Nillion quickstart "${projectName}" has been created successfully! 🚀`
  );
  console.log(`Follow the rest of the Documenation Quickstart to get started!`);
}

main();
