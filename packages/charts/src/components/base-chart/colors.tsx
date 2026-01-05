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

import tkns from '@lualtek/tokens/web/tokens.json';

export const BASE_CHART_COLORS = [
  tkns.color.cyan[60],
  tkns.color.yellow[60],
  tkns.color.green[50],
  tkns.color.purple[50],
  tkns.color.indigo[50],
  tkns.color.dipsy[50],
  tkns.color.red[50],
  tkns.color.brand[50],
];

export const getChartDefaultColor = (index: number) => BASE_CHART_COLORS[index % BASE_CHART_COLORS.length];
