import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Base configuration for all files
    files: ["**/*.ts", "**/*.tsx"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    // Specific configuration for test files
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      // Disable or adjust rules for test files
      "@typescript-eslint/no-magic-numbers": "off",
      // Add any other test-specific rule adjustments here
    },
  }
);