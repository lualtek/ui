
/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import { createRequire } from 'node:module';
import path from 'node:path';

import fs from 'fs-extra';

const require = createRequire(import.meta.url);

const deeperKeys = ['color', 'font', 'icon'];

const printCorrectValue = (value: string | number) => (Number.isNaN(Number(value)) ? `'${value}'` : `${value} | '${value}'`);
const getTypeUnion = (json: Record<string, unknown>) => Object.keys(json).reduce(
  (acc, key, index) => acc.concat(`${index !== 0 ? '| ' : ''}${printCorrectValue(key)} `), '',
);

const reduceTokensJson = (tokens: Record<string, unknown>): string => Object.keys(tokens).reduce((acc, key) => {
  const jsonEntity = tokens[key] as Record<string, unknown>;

  if (deeperKeys.includes(key)) {
    return acc.concat(`${key}: { ${reduceTokensJson(jsonEntity)} };\n`);
  }

  const allKeysAsTypeUnion = getTypeUnion(jsonEntity);
  return allKeysAsTypeUnion ? acc.concat(`${key}: ${allKeysAsTypeUnion.trimEnd()};\n `) : acc;
}, '');

const colorsToExclude = ['support'];

const run = () => {
  const tokens = require('../platforms/web/tokens.json') as Record<string, unknown>;
  const types = `export type TokensTypes = {
  ${reduceTokensJson(tokens)}
  colors: ${Object.keys(tokens.color as Record<string, unknown>).filter(i => !colorsToExclude.includes(i)).map(item => `'${item}'`).join('|')};
};`;

  fs.writeFileSync(path.join('platforms', 'web', 'index.d.ts'), types);
  fs.writeFileSync(path.join('platforms', 'web', 'index.js'), 'export default {}');
};

try {
  run();
  process.exit(0);
} catch (error: unknown) {
  console.error('! Something went wrong:', error);
  process.exit(1);
}
