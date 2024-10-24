# Create Nillion App

A CLI tool to create a new Nillion app with Next.js integration.

## Usage

This will create a new Nillion app in the your desired directory.

`npx @nillion/create-nillion-app`

## What it does

1. Installs `nilup`, the Nillion SDK tool installer and version manager
2. Clones an example Next.js project with App Router Settings
   a. Installs `@nillion/client-react-hooks` which has all your needs to use Nillion and Nada.
3. Installs an Nada projects with a pyenv
4. Then follow along the QuickStart [guide](https://github.com/NillionNetwork/awesome-nillion/issues/2) to do the following:
   - Create a simple Nada App
   - Connect a Nextjs <> Nada Program

Directory tree should look like:

```
.
├── README.md
├── app
│   ├── components
│   ├── home
│   ├── layout.tsx
│   ├── lib
│   └── page.tsx
├── nada
│   ├── .venv
│   ├── nada-project.toml
│   ├── requirements.txt
│   ├── src
│   └── tests
├── next.config.mjs
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json

```

## Requirements

If you are comfortable managing your environment, we suggest the following dependencies:

- Node.js 18.0.0 or later
- npm 6.0.0 or later
- Python 3.10 or later

Otherwise, just use [Docker](docker.com) and choose it during project setup.

## License

MIT
