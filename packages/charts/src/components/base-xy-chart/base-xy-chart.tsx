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
  // accessors: {
  //   xAccessor: (d: T) => any;
  //   yAccessor: (d: T) => any;
  // };
  height?: number;
  colors: XYChartTheme['colors'];
  showGrid?: boolean;
  ticks?: AnimatedGridProps['numTicks'];
  showBottomAxis?: boolean;
  hideTicks?: boolean;
};

export const BaseXYChart: FCChildrenClass<BaseXYChartProps> = ({
  className,
  children,
  colors = [],
  height = 300,
  showGrid = true,
  showBottomAxis = true,
  ticks = 8,
  hideTicks,
  // accessors,
  ...otherProps
}) => (
  <div className={className}>
    <XYChart
      height={height}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear' }}
      theme={{
        ...baseTheme,
        colors: [
          ...colors,
          //  Alessio: cose con baseTheme.colors
        ],
      } as XYChartTheme}
      {...otherProps}
    >
      {showBottomAxis && <Axis hideTicks={hideTicks} numTicks={ticks} orientation="bottom" tickLength={8} />}
      {showGrid && <Grid rows columns numTicks={ticks} />}
      {children}
      <CustomTooltip renderTooltip={() => 'test'} />
    </XYChart>
  </div>
);

BaseXYChart.displayName = 'XYChart';
