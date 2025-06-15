import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["lib/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["test/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
