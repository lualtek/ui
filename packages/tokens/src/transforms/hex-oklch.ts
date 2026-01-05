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

import Color, { ColorTypes } from 'colorjs.io';
import type { Transform } from 'style-dictionary/types';

const okLCHValues: Transform = {
  name: 'color/hex-to-oklch',
  type: 'value',
  filter: token => token.$type === 'color',
  transform: (token) => {
    if (!token.value && !token.$value) {
      throw new Error(`Color token "${token.name}" has an empty value.`);
    }

    const color = new Color(token.$value as ColorTypes).to('oklch');
    return color.toString().replace('none', '0');
  },
};

export default okLCHValues;
