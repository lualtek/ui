/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import path from 'path';

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

const colorsToExclude = ['primary', 'support'];

const run = () => {
  const tokens = require('../platforms/web/tokens.json') as Record<string, unknown>;
  const types = `export type TokensTypes = {
  ${reduceTokensJson(tokens)}
  colors: ${Object.keys(tokens.color as Record<string, unknown>).filter(i => !!(colorsToExclude.indexOf(i) - 1)).map(item => `'${item}'`).join('|')};
};`;

  fs.writeFileSync(path.join('platforms', 'web', 'index.ts'), types);
};

try {
  run();
  process.exit(0);
} catch (error: unknown) {
  console.error('⚠️ Something went wrong:', error);
  process.exit(1);
}
