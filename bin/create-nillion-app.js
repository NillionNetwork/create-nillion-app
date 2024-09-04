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
  const purpleText = "\x1b[34m"; // ANSI escape code for purple text
  const resetColor = "\x1b[0m"; // ANSI escape code to reset color
  console.log(
    `Welcome to ${purpleText}create-nillion-app${resetColor} - the quickstart Nillion CLI`
  );
}

function installNilup() {
  console.log("");
  console.log("Installing nilup... This may take a few minutes.🙏 ");
  execSync("curl -fsSL https://nilup.nilogy.xyz/install.sh | sh", {
    stdio: "inherit",
  });
  execSync("nilup install latest", { stdio: "inherit" });
  execSync("nilup use latest", { stdio: "inherit" });
  execSync("nilup init", { stdio: "inherit" });
}

function createNextJsProject(rootDir) {
  console.log("Creating Next.js project...");
  const nextAppPath = path.join(rootDir, "nillion-app");
  fs.mkdirSync(nextAppPath, { recursive: true });
  process.chdir(nextAppPath);
  execSync(
    `npx create-next-app@latest . --typescript --eslint --app --src-dir --use-npm`,
    { stdio: "inherit" }
  );
  execSync("npm install -P @nillion/client-react-hooks@latest", {
    stdio: "inherit",
  });
  process.chdir(rootDir);
}

function setupNadaFolder(rootDir) {
  console.log("Setting up Nada project...");

  const nadaPath = path.join(rootDir, "nada-quickstart");
  fs.mkdirSync(nadaPath, { recursive: true });
  process.chdir(nadaPath);

  // Initialize Nada project
  execSync("nada init nada_quickstart_programs", { stdio: "inherit" });

  // Change to the Nada project directory
  const nadaProjectPath = path.join(nadaPath, "nada_quickstart_programs");
  process.chdir(nadaProjectPath);

  // Create and activate Python virtual environment
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

  // Create a README file
  const readmePath = path.join(nadaProjectPath, "README.md");
  fs.writeFileSync(
    readmePath,
    "# Nillion Nada Project\n\n" +
      "This folder contains the Nada project for your Nillion app.\n\n" +
      "To activate the Python virtual environment, run:\n" +
      "```\n" +
      `${activateScript}\n` +
      "```\n"
  );

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
        ? "cd ..\\nada-quickstart\\nada_quickstart_programs && .venv\\Scripts\\activate"
        : "cd ../nada-quickstart/nada_quickstart_programs && source .venv/bin/activate",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function main() {
  const projectName = process.argv[2] || "nillion-quickstart";
  const continueFlag = process.argv.includes("--continue");

  displayLogo();
  displayWelcomeMessage();

  if (!continueFlag) {
    installNilup();
  } else {
    try {
      execSync("nilup -V", { stdio: "ignore" });
    } catch (error) {
      console.error(
        "nilup is not installed or not in PATH. Please run the script again without --continue flag."
      );
      process.exit(1);
    }

    execSync("nilup install latest", { stdio: "inherit" });
    execSync("nilup use latest", { stdio: "inherit" });
    execSync("nilup init", { stdio: "inherit" });

    // Create the root directory
    fs.mkdirSync(projectName, { recursive: true });
    process.chdir(projectName);

    createNextJsProject(process.cwd());
    setupNadaFolder(process.cwd());
    updatePackageJson(process.cwd());

    console.log(
      `Nillion quickstart "${projectName}" has been created successfully!`
    );
    console.log(
      `To activate the Nada virtual environment, first cd into the nillion-app directory, then run: npm run nada:activate`
    );
  }
}

main();
