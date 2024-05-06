import {
  Elevator,
  FCChildren, Panel, Stack, useStyles,
} from '@lualtek/react-components';
import {
  Tooltip as VisxTooltip,
} from '@visx/xychart';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import clsx from 'clsx';

import styles from './tooltip.module.css';

export type TooltipProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderTooltip: (props: RenderTooltipParams<object>) => React.ReactNode;
}

export const Tooltip: FCChildren<TooltipProps> = ({
  children,
  renderTooltip,
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
      renderTooltip={params => params.tooltipData?.nearestDatum && (
        <Elevator resting={2}>
          <Panel radius={8} vibrant bordered>
            <Stack vPadding={8} hPadding={8}>
              {renderTooltip(params)}
            </Stack>
          </Panel>
        </Elevator>
      )}
    />
  );
};

Tooltip.displayName = 'Tooltip';
