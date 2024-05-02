import { FCChildrenClass } from '@lualtek/react-components';
import {
  AnimatedAxis,
  Tooltip,
} from '@visx/xychart';

import { BaseXYChart, XYChartProps } from '../base-xy-chart';

export type LineChartProps = XYChartProps & {
  accessors: {
    xAccessor: (d: any) => any;
    yAccessor: (d: any) => any;
  };
}

export const LineChart: FCChildrenClass<LineChartProps> = ({
  className,
  children,
  accessors,
  ...otherProps
}) => (
  <BaseXYChart
    {...otherProps}
  >
    <AnimatedAxis orientation="bottom" />
    {children}
    <Tooltip
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      renderTooltip={({ tooltipData, colorScale }) => tooltipData?.nearestDatum && (
        <div>
          <div style={{ color: colorScale?.(tooltipData.nearestDatum.key) }}>
            {tooltipData.nearestDatum.key}
          </div>
          {accessors.xAccessor(tooltipData.nearestDatum.datum)}
          {', '}
          {accessors.yAccessor(tooltipData.nearestDatum.datum)}
        </div>
      )}
    />
  </BaseXYChart>
);

LineChart.displayName = 'LineChart';
