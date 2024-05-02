import { FCChildren } from '@lualtek/react-components';
import {
  Tooltip as VisxTooltip,
} from '@visx/xychart';

// import { XYChartProps } from '../base-xy-chart';

export type TooltipProps = {
  accessors: {
    xAccessor: (d: any) => any;
    yAccessor: (d: any) => any;
  };
}

export const Tooltip: FCChildren<TooltipProps> = ({
  children,
  accessors,
  ...otherProps
}) => (
  <VisxTooltip
    {...otherProps}
    snapTooltipToDatumX
    snapTooltipToDatumY
    showVerticalCrosshair
    showSeriesGlyphs
    unstyled
    applyPositionStyle
    renderTooltip={({ tooltipData, colorScale }) => tooltipData?.nearestDatum && (
      <>
        <div style={{ color: colorScale?.(tooltipData.nearestDatum.key) }}>
          {tooltipData.nearestDatum.key}
        </div>
        {accessors.xAccessor(tooltipData.nearestDatum.datum)}
        {', '}
        {accessors.yAccessor(tooltipData.nearestDatum.datum)}
      </>
    )}
  />
);

Tooltip.displayName = 'Tooltip';
