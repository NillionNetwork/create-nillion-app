export const installDependencies = async () => {
  // NPM install part
  console.log("Installing project dependencies...");
  await new Promise((resolve, reject) => {
    const installProcess = import("child_process").then((childProcess) =>
      childProcess.spawn("npm", ["install"], { stdio: "inherit" }),
    );
    installProcess
      .then((process) => {
        process.on("close", (code: number) => {
          if (code !== 0) {
            reject(new Error(`npm install failed with code ${code}`));
          } else {
            resolve(undefined);
          }
        });
      })
      .catch(reject);
  });
  console.log("Dependencies installed successfully.");
};
