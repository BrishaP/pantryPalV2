const { configs } = require("@eslint/js");

module.exports = [
  configs.recommended, // Base recommended ESLint rules
  {
    files: ["**/*.js"], // Apply to all JS files
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        console: true, // Allow console (Node.js global)
        process: true, // Allow process (Node.js global)
        require: true, // Allow require (Node.js global)
        module: true, // Allow module (Node.js global)
      },
    },
    rules: {
      "no-unused-vars": "warn", // Warn about unused variables
      "no-undef": "error", // Error for undefined variables
    },
  },
];
