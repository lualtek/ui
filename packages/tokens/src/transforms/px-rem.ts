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

import StyleDictionary from 'style-dictionary';
import type { ValueTransform } from 'style-dictionary/types';

const pxToRemBuiltin = StyleDictionary.hooks.transforms['size/pxToRem'] as ValueTransform;

const pxToRem: ValueTransform = {
  ...pxToRemBuiltin,
  filter: prop => prop.$type === 'dimension-px-to-rem',
  name: 'size/pxToRem',
};

export default pxToRem;
