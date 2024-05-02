import { FCChildrenClass } from '@lualtek/react-components';
import {
  AnimatedGrid,
  XYChart,
  XYChartTheme,
} from '@visx/xychart';

import { baseTheme } from '@/charts';

export type XYChartProps = {
  height?: number;
  theme?: Partial<XYChartTheme>;
  showGrid?: boolean;
};

export const BaseXYChart: FCChildrenClass<XYChartProps> = ({
  className,
  children,
  theme,
  height = 300,
  showGrid = true,
  ...otherProps
}) => (
  <XYChart
    height={height}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear' }}
    theme={{ ...baseTheme, ...theme } as XYChartTheme}
    {...otherProps}
  >
    {showGrid && <AnimatedGrid rows columns numTicks={4} />}
    {children}
  </XYChart>
);

BaseXYChart.displayName = 'XYChart';
