import jsonFlatTokens from '@lualtek/tokens/web/tokens-flat.json';

import { postcssObjBundlerConfig, postcssObjConfig } from './config-object';

export const getConfigObject = () => postcssObjConfig(jsonFlatTokens);
export const getConfigBundlerObject = () => postcssObjBundlerConfig(jsonFlatTokens);
