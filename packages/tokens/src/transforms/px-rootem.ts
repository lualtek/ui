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

import type { Transform } from 'style-dictionary/types';

const pxRootEm: Transform = {
  name: 'size/px-rootem',
  type: 'value',
  filter: prop => prop.$type === 'mediaquery',
  transform: token => `${(token.$value / 16).toFixed(0)}em`,
};

export default pxRootEm;
