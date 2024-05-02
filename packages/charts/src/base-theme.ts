import { buildChartTheme } from '@visx/xychart';

export const baseTheme = buildChartTheme({
  backgroundColor: 'var(--vibrancy-background-hard)', // used by Tooltip, Annotation
  colors: ['red', 'blue'], // categorical colors, mapped to series via `dataKey`s
  tickLength: 1,
  gridColor: 'var(--dimmed-3)',
  gridColorDark: 'var(--dimmed-4)', // used for axis baseline if x/yxAxisLineStyles not set
});

// // labels
// svgLabelBig?: SVGTextProps;
// svgLabelSmall?: SVGTextProps;
// htmlLabel?: HTMLTextStyles;

// // lines
// xAxisLineStyles?: LineStyles;
// yAxisLineStyles?: LineStyles;
// xTickLineStyles?: LineStyles;
// yTickLineStyles?: LineStyles;

// // grid

// gridStyles?: CSSProperties;
