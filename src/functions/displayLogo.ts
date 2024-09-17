const nillionLogo = `
       _ _ _ _             
 _ __ (_) | (_) ___  _ __  
| '_ \\| | | | |/ _ \\| '_ \\ 
| | | | | | | | (_) | | | |
|_| |_|_|_|_|\\___/|_| |_|
                           
`;

export function displayLogo(): void {
  console.log("\x1b[34m%s\x1b[0m", nillionLogo);
}
