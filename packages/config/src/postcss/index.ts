// import flatten from 'flat';

import { postcssConfig } from './config';

// const flatTokens: Record<string, any> = flatten(jsonTokens, {
//   delimiter: '-',
// });

// const prepareVariables = () => Object.keys(flatTokens).reduce((acc, key) => {
//   const newKey = `--${key}`;
//   acc[newKey] = `${flatTokens[key]}`;
//   return acc;
// }, {});

export const getConfig = () => postcssConfig({});
