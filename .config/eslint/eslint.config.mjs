import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import parser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const [baseConfig] = compat.extends(
  'next/core-web-vitals',
  'next/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
);

export default [
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/out/**', '**/public/**'],
  },
  {
    ...baseConfig,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ...(baseConfig.languageOptions || {}),
      parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...(baseConfig.rules || {}),
      quotes: 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
