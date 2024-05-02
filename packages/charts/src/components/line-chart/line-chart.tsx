import { FCChildrenClass } from '@lualtek/react-components';
import {
  Tooltip,
} from '@visx/xychart';

import { BaseXYChart, XYChartProps } from '../base-xy-chart';
import { Tooltip as CustomTooltip } from '../tooltip';

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
  <BaseXYChart {...otherProps}>
    {children}
    <Tooltip
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      unstyled
      applyPositionStyle
      renderTooltip={({ tooltipData, colorScale }) => tooltipData?.nearestDatum && (
        <CustomTooltip>
          <div style={{ color: colorScale?.(tooltipData.nearestDatum.key) }}>
            {tooltipData.nearestDatum.key}
          </div>
          {accessors.xAccessor(tooltipData.nearestDatum.datum)}
          {', '}
          {accessors.yAccessor(tooltipData.nearestDatum.datum)}
        </CustomTooltip>
      )}
    />
  </BaseXYChart>
);

LineChart.displayName = 'LineChart';
