import {
  useEffect, useRef, useState, useTransition,
} from 'react';
import {
  Area,
  AreaChart as ReAreaChart,
  Line,
  LineChart as ReLineChart,
  LineProps as ReLineProps,
  YAxis,
} from 'recharts';
import { DataKey } from 'recharts/types/util/types';
import { Except } from 'type-fest';

import { useChartAxis } from '@/charts/hooks/use-chart-axis';

import { BaseChart, BaseChartProps, DENSITIES } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import { getChartDefaultColor } from '../base-chart/colors';

export type LineProps<D> = {
  /**
   * The data key to assign to the line.
   */
  dataKey: DataKey<D>;
  /**
   * Used on the map as linekey id, should be unique
   */
  serieKeyId: string;
  /**
   * The Y axis assigned to this line.
   */
  side: 'left' | 'right';
  /**
   * The stroke color of the line.
   */
  color?: string;
  /**
   * The type of the line.
   *
   * @defaultValue 'monotone'
   */
  type?: ReLineProps['type'];
  /**
   * The unit assigned to the line value
   */
  unit?: string;
  /**
   * A custom name/label for the value
   */
  name?: ReLineProps['name'];
  /**
   * The (optional) data to render when MultiSeries.
   * This prop is not documented in the Recharts API, and it appears
   * only in the examples. It may breaks, so use it with caution.
   *
   * @example https://recharts.org/en-US/examples/LineChartHasMultiSeries
   */
  data?: D[];
};

export type LineChartAccessoryProps<T = Record<string, unknown>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  /**
   * Whether to show the dots on the series.
   *
   * @defaultValue false
   */
  showDots?: boolean;
  /**
   * Set the radius of the dots.
   */
  dotsSize?: number;
  /**
   * Whether to show the Y axis.
   *
   * @defaultValue true
   */
  showYAxis?: boolean;
  /**
   * Render areas for the series.
   */
  showAreas?: boolean;
} & T

export type LineChartProps<D extends ChartDataBaseType, L extends LineProps<D>> = LineChartAccessoryProps<{
  /**
   * The data to render.
   */
  data?: D[];
  /**
   * The chart series/series to render.
   */
  series: L[];
}>;

export function LineChart<D extends ChartDataBaseType, L extends LineProps<D>>({
  data,
  series,
  showDots = false,
  showYAxis = true,
  density = 'mid',
  showAreas = false,
  yDomainLeft,
  yDomainRight,
  yTypeLeft,
  yTypeRight,
  allowYDecimals = false,
  disableAnimation = false,
  focusable = false,
  dotsSize = 3,
  syncId,
  ...otherProps
}: LineChartProps<D, L>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(!disableAnimation);
  const [currentChartWidth, setCurrentChartWidth] = useState<number>();
  const [, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    yAxisWidthBiaxial,
    yAxisWidthNotBiaxial,
    hasLeftY,
    hasRightY,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useChartAxis({
    data: data ?? series.flatMap(serie => serie.data ?? []),
    series,
    yDomainLeft,
    yDomainRight,
  });

  useEffect(() => {
    if (chartRef?.current && !currentChartWidth) {
      setCurrentChartWidth(chartRef?.current.clientWidth);
    }
  }, [currentChartWidth]);

  const handleResize = (w: number) => {
    if (chartRef?.current) {
      if (currentChartWidth !== w) {
        startTransition(() => {
          setIsAnimationActive(false);
        });
      }

      setCurrentChartWidth(w);
    }
  };

  return (
    <BaseChart
      {...otherProps}
      ref={chartRef}
      onResize={handleResize}
      density={density}
      renderChart={children => (showAreas ? (
        <ReAreaChart
          data={data}
          accessibilityLayer={focusable}
          syncId={syncId}
        >
          {children}
        </ReAreaChart>
      ) : (
        <ReLineChart
          data={data}
          accessibilityLayer={focusable}
          syncId={syncId}
        >
          {children}
        </ReLineChart>
      ))}
    >
      <>
        {hasRightY && (
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={yDomainRight}
            type={yTypeRight}
            tickCount={DENSITIES[density]}
            hide={!showYAxis}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
            allowDecimals={allowYDecimals}
          />
        )}

        {hasLeftY && (
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={yDomainLeft}
            type={yTypeLeft}
            tickCount={DENSITIES[density]}
            hide={!showYAxis}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthNotBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
            allowDecimals={allowYDecimals}
          />
        )}

        {showAreas && (
          <defs>
            {series.map(({
              serieKeyId,
              color,
            }, index) => (
              <linearGradient key={serieKeyId} id={serieKeyId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color ?? getChartDefaultColor(index)} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color ?? getChartDefaultColor(index)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
        )}

        {series.map(({
          serieKeyId,
          side,
          color,
          type,
          data: serieData,
          ...otherSerieProps
        }, index) => {
          const computedStrokeColor = color ?? getChartDefaultColor(index);
          const commonProps = {
            yAxisId: side,
            isAnimationActive,
            type: type ?? 'monotone',
            stroke: computedStrokeColor,
            data: serieData,
            dot: showDots ? {
              r: dotsSize,
              stroke: computedStrokeColor,
              fill: computedStrokeColor,
            } : false,
            activeDot: {
              fill: showDots ? 'var(--global-foreground)' : computedStrokeColor,
              stroke: 'var(--global-background)',
              strokeWidth: 4,
              r: 6,
            },
          };

          return showAreas ? (
            <Area
              {...otherSerieProps}
              {...commonProps}
              key={serieKeyId}
              fillOpacity={1}
              fill={`url(#${serieKeyId})`}
            />
          ) : (
            <Line
              {...otherSerieProps}
              {...commonProps}
              key={serieKeyId}
            />
          );
        })}
      </>
    </BaseChart>
  );
}

