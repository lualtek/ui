import { FCChildrenClass } from '@lualtek/react-components';
import {
  Grid,
  XYChart,
  XYChartTheme,
} from '@visx/xychart';
import { AnimatedGridProps } from '@visx/xychart/lib/components/grid/AnimatedGrid';

import { baseTheme } from '@/charts';

export type XYChartProps = {
  height?: number;
  theme?: Partial<XYChartTheme>;
  showGrid?: boolean;
  gridDensity?: AnimatedGridProps['numTicks'];
};

export const BaseXYChart: FCChildrenClass<XYChartProps> = ({
  className,
  children,
  theme,
  height = 300,
  showGrid = true,
  gridDensity = 4,
  ...otherProps
}) => (
  <XYChart
    height={height}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear' }}
    theme={{ ...baseTheme, ...theme } as XYChartTheme}
    {...otherProps}
  >
    {showGrid && <Grid rows columns numTicks={gridDensity} />}
    {children}
  </XYChart>
);

BaseXYChart.displayName = 'XYChart';
