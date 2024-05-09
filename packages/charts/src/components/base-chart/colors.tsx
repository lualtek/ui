export const BASE_CHART_COLORS = [
  'rebeccapurple',
  'darkorange',
  'mediumseagreen',
  'darkturquoise',
  'darkorchid',
  'darkred',
];

export const getChartDefaultColor = (index: number) => BASE_CHART_COLORS[index % BASE_CHART_COLORS.length];
