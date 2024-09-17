export function displayWelcomeMessage(): void {
  const purpleText = "\x1b[34m";
  const resetColor = "\x1b[0m";
  console.log(
    `Welcome to ${purpleText}create-nillion-app${resetColor} - the quickstart Nillion CLI`
  );
}