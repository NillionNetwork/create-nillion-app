import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setupNadaFolder } from "./setupNadaFolder.js";

export function createNextJsProject(rootDir: string): void {
  console.log("--------------------");
  console.log("Creating Next.js project... ");
  console.log("This should take ~ 1 minute. Feel free to go stretch you legs / grab a coffee ☕️");

  const nextAppPath: string = path.join(rootDir);
  const pkgRoot = path.resolve(fileURLToPath(import.meta.url), "..", "..", "..");
  const examplesPath = path.join(pkgRoot, "examples", "nextjs");

  if (!fs.existsSync(examplesPath)) {
    throw new Error(`Next.js example not found at ${examplesPath}`);
  }

  fs.cpSync(examplesPath, nextAppPath, { recursive: true });

  const gitignorePath = path.join(nextAppPath, ".gitignore");
  const gitignoreContent = `# Dependencies
  /node_modules
  /.pnp
  .pnp.js
  .yarn/install-state.gz

  # Testing
  /coverage

  # Next.js
  /.next/
  /out/

  # Production
  /build

  # Misc
  .DS_Store
  *.pem

  # Debug
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  # Local env files
  .env*.local

  # Vercel
  .vercel

  # TypeScript
  *.tsbuildinfo
  next-env.d.ts

  # Nada venv
  nada/.venv/
  `;
  fs.writeFileSync(gitignorePath, gitignoreContent);

  setupNadaFolder(process.cwd());

  console.log(`Next.js project created successfully at ${"\x1b[34m" + nextAppPath + "\x1b[0m"}!`);
  console.log("--------------------");
}
