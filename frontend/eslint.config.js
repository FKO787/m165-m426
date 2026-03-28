// @ts-check
import JSeslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import angular from "angular-eslint";
import { defineConfig } from "eslint/config";
import TSeslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.ts"],

    extends: [
      JSeslint.configs.recommended,
      TSeslint.configs.recommended,
      TSeslint.configs.stylistic,
      angular.configs.tsRecommended,
      stylistic.configs.customize({ severity: "warn" }),
    ],

    plugins: { "@stylistic": stylistic },

    processor: angular.processInlineTemplates,

    rules: {

      // Angular Rules

      "@angular-eslint/directive-selector": [
        "error", { type: "attribute", prefix: "", style: "camelCase" },
      ],

      "@angular-eslint/component-selector": [
        "error", { type: "element", prefix: "", style: "kebab-case" },
      ],

      // Allow unused variables to be used by prepending an underscore "_"
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      }],

      // Stylistic Rules - https://eslint.style/rules/

      "@stylistic/max-len": ["warn", {
        code: 200,
        ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true,
      }],
      "@stylistic/no-tabs": "warn",
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/comma-dangle": ["warn", "only-multiline"],
      "@stylistic/quotes": ["warn", "double", { avoidEscape: true }],

      "@stylistic/array-element-newline": ["warn", "consistent"],
      "@stylistic/array-bracket-newline": ["warn", "consistent"],
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },
);
