import { PropsClassChildren } from '@lualtek/react-components';
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
import { Except } from 'type-fest';

import { useChartAxis } from '@/charts/hooks/use-chart-axis';

import { BaseChart, BaseChartProps, DENSITIES } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import { getChartDefaultColor } from '../base-chart/colors';

export type LineProps<D> = {
  /**
   * The data key to assign to the line.
   */
  dataKey: string | ((data: D) => string | number);
  /**
   * Used on the map as linekey id, should be unique
   */
  lineKeyId: string;
  /**
   * The Y axis assigned to this line.
   */
  side: 'left' | 'right';
  /**
   * The stroke color of the line.
   */
  stroke?: string;
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
  name?: string;
};

export type LineChartProps<D extends ChartDataBaseType, L extends LineProps<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  /**
   * The data to render.
   */
  data: D[];
  /**
   * The chart lines/series to render.
   */
  lines: L[];
  /**
   * Whether to show the dots on the lines.
   *
   * @defaultValue false
   */
  showDots?: boolean;
  /**
   * Whether to show the Y axis.
   *
   * @defaultValue true
   */
  showYAxis?: boolean;
  /**
   * Render areas for the lines.
   */
  showAreas?: boolean;
}

export function LineChart<D extends ChartDataBaseType, L extends LineProps<D>>({
  className,
  data,
  lines,
  showDots = false,
  showYAxis = true,
  density = 'mid',
  showAreas = false,
  children,
  ...otherProps
}: PropsClassChildren & LineChartProps<D, L>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [currentChartWidth, setCurrentChartWidth] = useState<number>();
  const [, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    yAxisWidthBiaxial,
    yAxisWidthNotBiaxial,
    hasLeftY,
    hasRightY,
  } = useChartAxis({
    data,
    lines,
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
          accessibilityLayer
        >
          {children}
        </ReAreaChart>
      ) : (
        <ReLineChart
          data={data}
          accessibilityLayer
        >
          {children}
        </ReLineChart>
      ))}
    >
      <>
        {showYAxis && hasRightY && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tickCount={DENSITIES[density]}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
          />
        )}

        {showYAxis && hasLeftY && (
          <YAxis
            yAxisId="left"
            orientation="left"
            tickCount={DENSITIES[density]}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthNotBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
          />
        )}

        {showAreas && (
          <defs>
            {lines.map(({
              lineKeyId,
              stroke,
            }, index) => (
              <linearGradient id={lineKeyId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stroke ?? getChartDefaultColor(index)} stopOpacity={0.4} />
                <stop offset="95%" stopColor={stroke ?? getChartDefaultColor(index)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
        )}

        {lines.map(({
          dataKey,
          lineKeyId,
          side,
          stroke,
          type,
          unit,
          name,
        }, index) => {
          const computedStrokeColor = stroke ?? getChartDefaultColor(index);
          const commonProps = {
            dataKey,
            yAxisId: side,
            isAnimationActive,
            connectNulls: true,
            type: type ?? 'monotone',
            stroke: computedStrokeColor,
            name,
            unit,
            dot: showDots ? {
              r: 3,
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
              {...commonProps}
              key={lineKeyId}
              fillOpacity={1}
              fill={`url(#${lineKeyId})`}
            />
          ) : (
            <Line
              {...commonProps}
              key={lineKeyId}
            />
          );
        })}
      </>
    </BaseChart>
  );
}

LineChart.displayName = 'LineChart';
