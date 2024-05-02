import { FCChildrenClass } from '@lualtek/react-components';
import {
  Axis,
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
  density?: AnimatedGridProps['numTicks'];
  showBottomAxis?: boolean;
  hideTicks?: boolean;
};

export const BaseXYChart: FCChildrenClass<XYChartProps> = ({
  className,
  children,
  theme,
  height = 300,
  showGrid = true,
  showBottomAxis = true,
  density = 8,
  hideTicks,
  ...otherProps
}) => (
  <XYChart
    height={height}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear' }}
    theme={{ ...baseTheme, ...theme } as XYChartTheme}
    {...otherProps}
  >
    {showBottomAxis && <Axis hideTicks={hideTicks} numTicks={density} orientation="bottom" tickLength={8} />}
    {showGrid && <Grid rows columns />}
    {children}
  </XYChart>
);

BaseXYChart.displayName = 'XYChart';
