// @ts-check
import JSeslint from '@eslint/js';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import TSeslint from 'typescript-eslint';

export default defineConfig(
  {
    files: ['**/*.ts'],

    extends: [
      JSeslint.configs.recommended,
      TSeslint.configs.recommended,
      TSeslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],

    processor: angular.processInlineTemplates,

    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: '',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: '',
          style: 'kebab-case',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility
    ],
    rules: {},
  },
);
