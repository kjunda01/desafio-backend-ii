import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],

      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
