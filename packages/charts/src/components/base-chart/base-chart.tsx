'use client';

import { Stack, Text } from '@lualtek/react-components';
import { type FC, type JSX, type ReactElement, type ReactNode, useMemo } from 'react';
import type { LegendProps, ResponsiveContainerProps, XAxisProps, YAxisProps } from 'recharts';
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip as ReTooltip, XAxis } from 'recharts';
import type { CartesianChartProps } from 'recharts/types/util/types';
import type { Except } from 'type-fest';

import type { TooltipProps } from '../tooltip';
import { Tooltip } from '../tooltip';

export type ChartDataBaseType = Record<string, string | number | null>;

export type BaseChartProps = Except<ResponsiveContainerProps, 'className'> & {
  className?: string;
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
   * Ensures that all datapoints within a chart contribute to its domain calculation, even when they are hidden.
   * Show points with no data on the X axis.
   *
   * @defaultValue false
   * @see https://recharts.org/en-US/examples/HidePointsWithNoDataOnXAxis
   */
  includeHiddenPoints?: boolean;
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
   * Set the label formatter for the X axis
   */
  xFormatter?: XAxisProps['tickFormatter'];
  /**
   * Set the domain for the X axis.
   */
  xType?: XAxisProps['type'];
  /**
   * Allow the axis has duplicated categorys or not when the type of axis is "category".
   * @url https://recharts.org/en-US/api/XAxis#allowDuplicatedCategory
   */
  xAllowDuplicatedCategory?: XAxisProps['allowDuplicatedCategory'];
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
   * Allow decimals on the Y axis.
   *
   * @defaultValue false
   */
  allowYDecimals?: YAxisProps['allowDecimals'];
  /**
   * Disable the animation for the chart.
   *
   * @defaultValue false
   */
  disableAnimation?: boolean;
  /**
   * Reference elements to render on the chart.
   * This props accepts ReferenceLine, ReferenceArea, ReferenceDot.
   */
  referenceComponent?: ReactNode;
  /**
   * Enable or disable the usage of payload colors inside tooltip data.
   */
  tooltipColors?: TooltipProps['tooltipColors'];
  /**
   * Enable or disable the accessibility layer on the chart.
   *
   * @defaultValue false
   */
  focusable?: boolean;
  /**
   * ID for sync multiple charts
   */
  syncId?: string | number;
  /**
   * Render a custom tooltip instead of the default one.
   *
   * @param props { active?: boolean; label?: string | number; payload?: TooltipEntry[]; }
   * @returns JSX.Element
   */
  customTooltip?: (props: TooltipProps) => JSX.Element;
  /**
   * custom function to format the tooltip label/title
   * @param value TooltipEntry
   * @returns string
   */
  formatTooltipLabel?: TooltipProps['formatLabel'];
  /**
   * custom function to format the payload labels
   * @param value TooltipEntry
   * @returns string
   */
  formatTooltipName?: TooltipProps['formatName'];
  /**
   * custom function to format the payload values
   * @param entry TooltipEntry
   * @returns React.ReactNode
   */
  formatTooltipValue?: TooltipProps['formatValue'];
  /**
   * custom function to format the payload values
   * @param entry TooltipEntry
   * @returns React.ReactNode
   */
  tooltipDecorator?: TooltipProps['tooltipDecorator'];
  /**
   * @private Used by other charts to render the chart wrapper
   * @param children ReactNode
   * @returns ReactElement
   */
  renderChart: (children: ReactNode) => ReactElement<any>;
  /**
   * Specifies the external margin around a cartesian chart layout.
   * Allows controlling the spacing outside the chart area.
   * The value is optional and can be used to adjust the chart's position or spacing within a container.
   * Typically defined as an object with properties for top, right, bottom, and left margins.
   */
  margin?: CartesianChartProps['margin'];
  /**
   * Call custom function when the on chart is navigated
   */
  handleChartUpdate?: CartesianChartProps['onTouchStart'];
};

type BaseChartComponent = FC<BaseChartProps & Pick<React.ComponentPropsWithRef<'div'>, 'ref'>>;

export const DENSITIES: Record<NonNullable<BaseChartProps['density']>, number> = {
  low: 3,
  mid: 6,
  high: 9,
};

export const BaseChart: BaseChartComponent = ({
  className,
  children,
  showGrid = true,
  height = 300,
  showXAxis = false,
  includeHiddenPoints = false,
  showTooltip = true,
  showLegend = false,
  legendAlign = 'right',
  xType,
  dataKeyX = 'x',
  xPadding = 0,
  xFormatter,
  xDomain,
  xAllowDuplicatedCategory,
  density = 'mid',
  tooltipColors,
  customTooltip,
  formatTooltipLabel,
  formatTooltipName,
  formatTooltipValue,
  tooltipDecorator,
  referenceComponent,
  cursorStyle,
  renderChart,
  ref: forwardedRef,
  ...otherProps
}) => {
  const cursor = useMemo(
    () => ({
      stroke: 'var(--dimmed-3)',
      strokeWidth: 2,
      fill: 'var(--dimmed-2)',
      ...cursorStyle,
    }),
    [cursorStyle],
  );

  return (
    <div ref={forwardedRef} className={className}>
      <ResponsiveContainer width="100%" debounce={0} height={height} {...otherProps}>
        {renderChart(
          <>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="color-mix(in oklch, var(--global-foreground), transparent 80%)"
              />
            )}

            <ReTooltip
              cursor={cursor}
              isAnimationActive={false}
              content={
                !showTooltip
                  ? () => null
                  : (customTooltip ?? (
                      <Tooltip
                        formatLabel={formatTooltipLabel}
                        formatName={formatTooltipName}
                        formatValue={formatTooltipValue}
                        tooltipDecorator={tooltipDecorator}
                        tooltipColors={tooltipColors}
                      />
                    ))
              }
            />
            <XAxis
              dataKey={dataKeyX}
              tickCount={DENSITIES[density]}
              includeHidden={includeHiddenPoints}
              hide={!showXAxis}
              type={xType}
              minTickGap={32}
              tick={{ fill: 'var(--dimmed-3)', fontSize: '0.8em' }}
              tickFormatter={xFormatter}
              padding={{ left: xPadding, right: xPadding }}
              tickLine={{ stroke: 'var(--dimmed-3)' }}
              axisLine={{ stroke: 'var(--dimmed-4)' }}
              tickSize={8}
              allowDataOverflow
              tickMargin={8}
              domain={xDomain}
              allowDuplicatedCategory={xAllowDuplicatedCategory}
            />
            {referenceComponent}

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
                      <Text as="span" size={14} style={{ color }}>
                        {value}
                      </Text>
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
};
