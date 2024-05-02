import { FCChildrenClass } from '@lualtek/react-components';
import {
  Axis,
  Grid,
  XYChart,
  XYChartTheme,
} from '@visx/xychart';
import { AnimatedGridProps } from '@visx/xychart/lib/components/grid/AnimatedGrid';

import { baseTheme } from '@/charts';

import { Tooltip as CustomTooltip } from '../tooltip';

export type BaseXYChartProps = {
  accessors: {
    xAccessor: (d: any) => any;
    yAccessor: (d: any) => any;
  };
  height?: number;
  theme?: Partial<XYChartTheme>;
  showGrid?: boolean;
  ticks?: AnimatedGridProps['numTicks'];
  showBottomAxis?: boolean;
  hideTicks?: boolean;
};

export const BaseXYChart: FCChildrenClass<BaseXYChartProps> = ({
  className,
  children,
  theme,
  height = 300,
  showGrid = true,
  showBottomAxis = true,
  ticks = 8,
  hideTicks,
  accessors,
  ...otherProps
}) => (
  <XYChart
    height={height}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear' }}
    theme={{ ...baseTheme, ...theme } as XYChartTheme}
    {...otherProps}
  >
    {showBottomAxis && <Axis hideTicks={hideTicks} numTicks={ticks} orientation="bottom" tickLength={8} />}
    {showGrid && <Grid rows columns />}
    {children}
    <CustomTooltip accessors={accessors} />
  </XYChart>
);

BaseXYChart.displayName = 'XYChart';
