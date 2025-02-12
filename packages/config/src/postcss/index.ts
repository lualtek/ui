import jsonFlatTokens from '@lualtek/tokens/web/tokens-flat.json';

import { postcssObjConfig } from './config-object.js';

export const getConfigObject = () => postcssObjConfig(jsonFlatTokens);
