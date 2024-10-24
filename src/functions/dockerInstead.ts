import readline from "readline";
import fs from "fs";
import fsp from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Eta } from "eta";
import { execSync } from "child_process";

export function isDockerInstalled(): boolean {
  try {
    const dockerVer = execSync("docker --version", { stdio: "pipe" }).toString().trim();
    execSync("docker --version", { stdio: "pipe" });
    console.log(`Docker is already installed: ${dockerVer}`);
    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}

export function noDocker(): string {
  return "Docker is not installed. Please install Docker (https://www.docker.com) and try again.";
  process.exit();
}

export async function wouldPreferDocker(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const dockerMessage =
    "Would you prefer to use Docker to run the project? Recommended if you are not comfortable managing your own dependencies. (default: no) ";

  return new Promise((resolve) => {
    rl.question(dockerMessage, (answer) => {
      rl.close();
      const yesOrNo = answer.trim() || "nillion-quickstart";
      if (/y|yes|n|no/.test(yesOrNo)) {
        resolve(yesOrNo === "y" || yesOrNo === "yes");
      } else {
        console.log("Using default: no Docker container.");
        resolve(false);
      }
    });
  });
}

export function createProject(useDocker: boolean, projectName: string, rootDir: string): void {
  console.log("--------------------");
  console.log("Creating Docker project... please, wait a moment.");
  const nextAppPath: string = path.join(rootDir);

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const examplesPath = path.join(currentDir, "..", "..", "examples", "nextjs");

  if (!fs.existsSync(examplesPath)) {
    throw new Error(`Next.js example not found at ${examplesPath}`);
  }

  fs.cpSync(examplesPath, nextAppPath, { recursive: true });
  const root = path.join(currentDir, "..", "..");
  instantiateTemplates(useDocker, projectName, root, nextAppPath);

  console.log(`Your project has been created successfully at ${nextAppPath}!`);
  console.log("--------------------");
}

const npm = { name: "package.json" };
const docker = { name: "docker-compose.yaml" };

function instantiateTemplates(
  useDocker: boolean,
  projectName: string,
  rootDir: string,
  projectDir: string,
) {
  const info = [npm];
  if (useDocker) info.push(docker);

  const eta = new Eta({ views: path.join(rootDir, "templates") });

  info
    .map(({ name }) => {
      return {
        content: eta.render(`./${name}.eta`, { useDocker, projectName }),
        fullNamePath: path.join(projectDir, name),
      };
    })
    .forEach(writeFile);
}

interface FileInfo {
  fullNamePath: string;
  content: string;
}

async function writeFile({ fullNamePath, content }: FileInfo) {
  try {
    await fsp.writeFile(fullNamePath, content);
  } catch (err) {
    console.log(`Error Writing file ${fullNamePath}: ${err}`);
  }
}
