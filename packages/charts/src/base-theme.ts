import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import { buildChartTheme } from '@visx/xychart';

export const baseTheme = buildChartTheme({
  backgroundColor: 'var(--vibrancy-background-hard)', // used by Tooltip, Annotation
  colors: [
    `oklch(${tkns.color.cyan[50]})`,
    `oklch(${tkns.color.yellow[50]})`,
    `oklch(${tkns.color.blue[50]})`,
    `oklch(${tkns.color.dipsy[50]})`,
    `oklch(${tkns.color.green[50]})`,
    `oklch(${tkns.color.magenta[50]})`,
    `oklch(${tkns.color.red[50]})`,
    `oklch(${tkns.color.salmon[50]})`,
  ],
  tickLength: 1,
  svgLabelSmall: {
    fill: 'var(--dimmed-5)',
  },
  svgLabelBig: {
    fill: 'var(--dimmed-5)',
  },
  htmlLabel: {},

  // Grid
  gridColor: 'var(--dimmed-5)',
  gridColorDark: 'var(--dimmed-3)', // used for axis baseline if x/yxAxisLineStyles not set
  gridStyles: {
    strokeWidth: 0.2,
    strokeDasharray: '4 4',
  },
  // Lines
  xAxisLineStyles: {},
  yAxisLineStyles: {},
  xTickLineStyles: {},
  yTickLineStyles: {},
});
