import {
  Elevator,
  FCChildren, Panel, Stack, useStyles,
} from '@lualtek/react-components';
import {
  Tooltip as VisxTooltip,
} from '@visx/xychart';
import clsx from 'clsx';

import { BaseXYChartProps } from '../base-xy-chart';
import styles from './tooltip.module.css';

export type TooltipProps<T> = {
  accessors: BaseXYChartProps<T>['accessors'];
}

export const Tooltip: FCChildren<TooltipProps<any>> = ({
  children,
  accessors,
  ...otherProps
}) => {
  const { vibrancy } = useStyles({
    vibrancy: {
      blur: 'soft',
    },
  });

  return (
    <VisxTooltip
      {...otherProps}
      {...vibrancy.attributes}
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      className={clsx(styles.Tooltip)}
      glyphStyle={{
        stroke: 'var(--global-background)',
        strokeWidth: 2,
      }}
      renderTooltip={({ tooltipData, colorScale }) => tooltipData?.nearestDatum && (
        <Elevator resting={2}>
          <Panel radius={8} vibrant bordered>
            <Stack vPadding={8} hPadding={8}>

              <div style={{ color: colorScale?.(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {', '}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </Stack>
          </Panel>
        </Elevator>
      )}
    />
  );
};

Tooltip.displayName = 'Tooltip';
