import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { 
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...pluginJs.configs.recommended.rules, // Standard JS rules
      ...tseslint.configs.recommended.rules, // TypeScript rules
      ...pluginReact.configs.recommended.rules, // React rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js projects
      "prettier/prettier": "off", // Ensure Prettier formatting
      "no-console": "warn", // Warn on console.log usage
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused vars starting with _
      "react/prop-types": "off", // Disable PropTypes enforcement (use TypeScript instead)
    },
  },
  
];