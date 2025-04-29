import { defineConfig } from '@eslint/config-helpers';
import daStyle from 'eslint-config-dicodingacademy';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginCypress from 'eslint-plugin-cypress';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: [
      daStyle
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
      pluginCypress
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'linebreak-style': 'off',
      'no-alert': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off'
    }
  }
]);