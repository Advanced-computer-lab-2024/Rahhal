import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
  },
});
