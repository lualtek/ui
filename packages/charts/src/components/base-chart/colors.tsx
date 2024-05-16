import tkns from '@lualtek/tokens/platforms/web/tokens.json';

export const BASE_CHART_COLORS = [
  `oklch(${tkns.color.cyan[60]})`,
  `oklch(${tkns.color.yellow[60]})`,
  `oklch(${tkns.color.green[50]})`,
  `oklch(${tkns.color.purple[50]})`,
  `oklch(${tkns.color.indigo[50]})`,
  `oklch(${tkns.color.dipsy[50]})`,
  `oklch(${tkns.color.red[50]})`,
  `oklch(${tkns.color.brand[50]})`,
];

export const getChartDefaultColor = (index: number) => BASE_CHART_COLORS[index % BASE_CHART_COLORS.length];
