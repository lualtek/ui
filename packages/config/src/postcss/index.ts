import jsonTokens from '@lualtek/tokens/platforms/web/tokens.json';
import flatten from 'flat';

import { postcssConfig } from './config';

const flatTokens: Record<string, any> = flatten(jsonTokens, {
  delimiter: '-',
});

const prepareTokens = () => Object.keys(flatTokens).reduce<Record<string, string>>((acc, key) => {
  const newKey = key;
  acc[newKey] = `${flatTokens[key]}`;
  return acc;
}, {});

export const getConfig = () => postcssConfig(prepareTokens());
