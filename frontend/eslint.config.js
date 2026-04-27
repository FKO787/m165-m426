// @ts-check
import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';
import ESLintJS from '@eslint/js';
import ESLintTS from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

// Allow unused variables to be used by prepending an underscore '_'
const unusedVarIgnorePattern = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
  destructuredArrayIgnorePattern: '^_',
};

export default defineConfig([

  // Set ESLint and Stylistic for Java- and TypeScript
  {
    files: ['**/*.js', '**/*.ts'],
    extends: [
      ESLintJS.configs.recommended,
      stylistic.configs.customize({ severity: 'warn' }),
    ],

    rules: { // Stylistic Rules: https://eslint.style/rules

      '@stylistic/max-len': ['warn', {
        code: 250,
        ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true,
      }],

      '@stylistic/linebreak-style': ['off'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],

      '@stylistic/array-element-newline': ['warn', 'consistent'],
      '@stylistic/array-bracket-newline': ['warn', 'consistent'],
    },
  },

  {
    files: ['**/*.js'],
    rules: { 'no-unused-vars': ['warn', unusedVarIgnorePattern] },
  },

  {
    files: ['**/*.ts'],
    extends: [
      angular.configs.tsRecommended,
      ESLintTS.configs.recommended,
      ESLintTS.configs.stylistic,
    ],
    processor: angular.processInlineTemplates,

    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: '', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: '', style: 'kebab-case' }],

      '@typescript-eslint/no-unused-vars': ['warn', unusedVarIgnorePattern],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },

]);
