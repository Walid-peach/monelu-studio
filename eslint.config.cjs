// ESLint v9 flat config
const tsPlugin      = require("@typescript-eslint/eslint-plugin");
const tsParser      = require("@typescript-eslint/parser");
const reactPlugin   = require("eslint-plugin-react");
const reactHooks    = require("eslint-plugin-react-hooks");
const prettier      = require("eslint-config-prettier");

module.exports = [
  // ── Ignored paths ──────────────────────────────────────────────────────────
  {
    ignores: ["node_modules/**", "out/**", "dist/**", "archive/**"],
  },

  // ── TypeScript + React source files ────────────────────────────────────────
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // TypeScript — warn only so commits aren't blocked by style issues
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-function": "off",

      // React
      "react/react-in-jsx-scope": "off", // React is imported explicitly in every file
      "react/prop-types": "off",          // TypeScript covers prop types

      // React hooks — keep these as errors; wrong hook usage is always a bug
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ── Disable rules that conflict with Prettier ───────────────────────────────
  prettier,
];
