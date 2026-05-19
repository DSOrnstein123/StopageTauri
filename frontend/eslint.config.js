import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ["src/plugins/**/*.{ts,tsx}", "src/core-plugins/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@plugins/*/*",
                "../plugins/*/*",
                "../../plugins/*/*",
                "@core-plugins/*/*",
                "../core-plugins/*/*",
                "../../core-plugins/*/*",
              ],
              message: "No deep import.",
            },
            {
              group: ["@system/*/*"],
              message: "No deep import.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/system/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@plugins/*/*", "@core-plugins/*/*"],
              message: "No deep import.",
            },
          ],
        },
      ],
    },
  },
]);
