import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Import recommended rules from ESLint and react-hooks
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Custom rules
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }], // This will show unused variables as warnings (yellow)

      // Make sure other rules for errors are still treated as errors
      "no-empty": ["warn"], // Error for empty blocks (empty catch, etc.)
      "no-undef": ["error"], // Error for undefined variables

      // React refresh and other rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Add other rules you need (can also include other syntax error rules)
    },
  },
];
