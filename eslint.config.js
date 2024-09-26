import globals from "globals";
import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginJest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: eslintPluginPrettier,
      jest: eslintPluginJest,
    },
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      "prettier/prettier": "error",
      ...eslintPluginJest.configs.recommended.rules,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
    },
  },
];
