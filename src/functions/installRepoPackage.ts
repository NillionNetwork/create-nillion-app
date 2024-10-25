export const installDependencies = (cmd: string, args: string[]) => async () => {
  // abstracted to use either npm or docker
  console.log("Installing project dependencies...");
  await new Promise((resolve, reject) => {
    const installProcess = import("child_process").then((childProcess) =>
      childProcess.spawn(cmd, args, { stdio: "inherit" }),
    );
    installProcess
      .then((process) => {
        process.on("close", (code: number) => {
          if (code !== 0) {
            reject(new Error(`installation failed with code ${code}`));
          } else {
            resolve(undefined);
          }
        });
      })
      .catch(reject);
  });
  console.log("Dependencies installed successfully.");
};

export const installRepoPackage = installDependencies("npm", ["install"]);
