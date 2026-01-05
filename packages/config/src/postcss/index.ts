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

import jsonFlatTokens from '@lualtek/tokens/web/tokens-flat.json';

import { postcssObjConfig } from './config-object.js';

export const getConfigObject = () => postcssObjConfig(jsonFlatTokens);
