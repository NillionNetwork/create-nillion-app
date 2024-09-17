import { execSync } from "child_process";

export function installNilup(): void {
  console.log("--------------------");
  console.log("Installing nilup... This may take a few minutes.🙏 ");
  execSync("curl -fsSL https://nilup.nilogy.xyz/install.sh | sh", {
    stdio: "inherit",
  });
  execSync("nilup install latest", { stdio: "inherit" });
  execSync("nilup use latest", { stdio: "inherit" });
  execSync("nilup init", { stdio: "inherit" });
}
