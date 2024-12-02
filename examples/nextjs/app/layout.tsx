import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Nillion App",
  description: "Quickstart a Nillion fullstack app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="flex justify-end items-center p-4 pr-6">
          <a
            href="https://github.com/NillionNetwork/create-nillion-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/lightmode-github.svg"
              className="w-10 h-10 block dark:hidden"
              alt="GitHub Icon (Light Mode)"
            />
            <img
              src="/darkmode-github.svg"
              className="w-10 h-10 hidden dark:block"
              alt="GitHub Icon (Dark Mode)"
            />
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
