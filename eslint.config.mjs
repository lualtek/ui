// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import path from "node:path";
import { fileURLToPath } from 'node:url';
import { mainConfig as lasalefamineConfig } from '@lasalefamine/eslint-config';
import { reactHooksConfig } from '@lasalefamine/eslint-config/hooks.mjs';
import tsParser from '@typescript-eslint/parser';

const Filename = fileURLToPath(import.meta.url);
const Dirname = path.dirname(Filename);

const languageOptions = {
  parser: tsParser,
  ecmaVersion: 'latest',
  sourceType: 'script',

  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: Dirname,
  },
};

const jsFiles = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'];

export default [{
  ignores: ['**/dist', '**/*.module.css.d.ts', '**/*.json'],
}, ...lasalefamineConfig.map((config) => ({ ...config, files: jsFiles, languageOptions })), ...reactHooksConfig, {
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
  },
}, ...storybook.configs["flat/recommended"]];
