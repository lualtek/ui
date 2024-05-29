import { PropsClassChildren, Stack, Text } from '@lualtek/react-components';
import {
  forwardRef, ReactElement, ReactNode, useMemo,
} from 'react';
import {
  CartesianGrid,
  Legend,
  LegendProps,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip as ReTooltip,
  XAxis,
  XAxisProps,
  YAxisProps,
} from 'recharts';

import { Tooltip, TooltipProps } from '../tooltip';

export type ChartDataBaseType = Record<string, string | number>;

export type BaseChartProps = ResponsiveContainerProps & {
  /**
   * The data key to assign to the x-axis.
   */
  dataKeyX?: string | ((data: ChartDataBaseType) => string | number);
  /**
   * Whether to show the grid.
   *
   * @defaultValue true
   */
  showGrid?: boolean;
  /**
   * Whether to show the x-axis.
   *
   * @defaultValue false
   */
  showXAxis?: boolean;
  /**
   * Whether to show the tooltip.
   *
   * @defaultValue true
   */
  showTooltip?: boolean;
  /**
   * Whether to show the legend.
   *
   * @defaultValue false
   */
  showLegend?: boolean;
  /**
   * Set the position of the legend.
   *
   * @defaultValue 'right'
   */
  legendAlign?: LegendProps['align'];
  /**
   * Set the grid density (number of ticks).
   * This is used only if the grid is rendered.
   *
   * @defaultValue 'mid'
   */
  density?: 'low' | 'mid' | 'high';
  /**
   * The cursor style for the tooltip.
   */
  cursorStyle?: Record<string, string | number> | false;
  /**
   * The padding for the x-axis. Prevent lines from touching the edges.
   */
  xPadding?: number;
  /**
   * Set the domain for the X axis.
   * @url https://recharts.org/en-US/api/XAxis#domain
   */
  xDomain?: XAxisProps['domain'];
  /**
   * Set the domain for the left Y axis.
   */
  yDomainLeft?: YAxisProps['domain'];
  /**
   * Set the domain for the right Y axis.
   */
  yDomainRight?: YAxisProps['domain'];
  /**
   * Set the domain for the left Y axis.
   */
  yTypeLeft?: YAxisProps['type'];
  /**
   * Set the domain for the right Y axis.
   */
  yTypeRight?: YAxisProps['type'];
  /**
   * Render a custom tooltip instead of the default one.
   *
   * @private Used by other charts to render the chart wrapper*
   * @param props { active?: boolean; label?: string; payload?: TooltipEntry[]; }
   * @returns JSX.Element
   */
  customTooltip?: (props: TooltipProps) => JSX.Element;
  /**
   * @private Used by other charts to render the chart wrapper
   * @param children ReactNode
   * @returns ReactElement
   */
  renderChart: (children: ReactNode) => ReactElement;
};

export const DENSITIES: Record<NonNullable<BaseChartProps['density']>, number> = {
  low: 3,
  mid: 6,
  high: 9,
};

export const BaseChart = forwardRef<HTMLDivElement, PropsClassChildren<BaseChartProps>>(({
  className,
  children,
  showGrid = true,
  height = 300,
  showXAxis = false,
  showTooltip = true,
  showLegend = false,
  legendAlign = 'right',
  dataKeyX = 'x',
  xPadding = 0,
  xDomain,
  density = 'mid',
  renderChart,
  customTooltip,
  cursorStyle,
  ...otherProps
}, forwardedRef) => {
  const cursor = useMemo(() => ({
    stroke: 'var(--dimmed-3)',
    strokeWidth: 2,
    fill: 'var(--dimmed-2)',
    ...cursorStyle,
  }), [cursorStyle]);

  return (
    <div ref={forwardedRef} className={className}>
      <ResponsiveContainer
        width="100%"
        debounce={0}
        height={height}
        {...otherProps}
      >
        {renderChart(
          <>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="color-mix(in oklch, var(--global-foreground), transparent 80%)"
              />
            )}
            {showTooltip && (
              <ReTooltip
                cursor={cursor}
                content={customTooltip ?? Tooltip}
              />
            )}
            <XAxis
              dataKey={dataKeyX}
              tickCount={DENSITIES[density]}
              hide={!showXAxis}
              minTickGap={32}
              tick={{ fill: 'var(--dimmed-3)', fontSize: '0.8em' }}
              padding={{ left: xPadding, right: xPadding }}
              tickLine={{ stroke: 'var(--dimmed-3)' }}
              axisLine={{ stroke: 'var(--dimmed-4)' }}
              tickSize={8}
              allowDataOverflow
              tickMargin={8}
              domain={xDomain}
            />
            {children}
            {showLegend && (
              <Legend
                align={legendAlign}
                iconType="circle"
                iconSize={8}
                formatter={(value, entry) => {
                  const { color } = entry;
                  return (
                    <Stack inline fill={false} vPadding={8}>
                      <Text as="span" size={14} style={{ color }}>{value}</Text>
                    </Stack>
                  );
                }}
              />
            )}
          </>,
        )}
      </ResponsiveContainer>
    </div>
  );
});

BaseChart.displayName = 'XYChart';
