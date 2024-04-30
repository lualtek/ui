import { FCChildrenClass } from '@lualtek/react-components';
import {
  AnimatedAxis,
  AnimatedGrid,
  Tooltip,
  XYChart,
} from '@visx/xychart';

export type LinearChartProps = {
  accessors: {
    xAccessor: (d: any) => any;
    yAccessor: (d: any) => any;
  };
}

export const LinearChart: FCChildrenClass<LinearChartProps> = ({
  className,
  children,
  accessors,
  ...otherProps
}) => (
  <XYChart
    height={300}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear' }}
    {...otherProps}
  >
    <AnimatedAxis orientation="bottom" />
    <AnimatedGrid columns={false} numTicks={4} />
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
  </XYChart>
);

LinearChart.displayName = 'LinearChart';
