import { PropsClassChildren } from '@lualtek/react-components';
import {
  useEffect, useRef, useState, useTransition,
} from 'react';
import {
  Bar,
  BarChart as ReBarChart,
  YAxis,
} from 'recharts';
import { Except } from 'type-fest';

import { useChartAxis } from '@/charts/hooks/use-chart-axis';

import { BaseChart, BaseChartProps, DENSITIES } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import { getChartDefaultColor } from '../base-chart/colors';

export type BarProps<D> = {
  /**
   * The data key to assign to the line.
   */
  dataKey: string | ((data: D) => string | number);
  /**
   * Used on the map as bar id, if multiple bars use the same id they will be stacked
   */
  serieKeyId: string;
  /**
   * The stack id to assign to the bar to stack it with other bars.
   */
  stackId?: string;
  /**
   * The Y axis assigned to this line.
   */
  side: 'left' | 'right';
  /**
   * The color color of the line.
   */
  color?: string;
  /**
   * The unit assigned to the line value
   */
  unit?: string;
  /**
   * A custom name/label for the value
   */
  name?: string;
};

export type BarChartProps<D extends ChartDataBaseType, B extends BarProps<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  /**
   * The data to render.
   */
  data: D[];
  /**
   * The chart series/series to render.
   */
  series: B[];
  /**
   * Whether to show the Y axis.
   *
   * @defaultValue true
   */
  showYAxis?: boolean;
  /**
   * The gap between bar groups
   *
   * @defaultValue '20%'
   */
  barCategoryGap?: string | number;
  /**
   * Set the size of the bars
   */
  barSize?: number | string;
}

export function BarChart<D extends ChartDataBaseType, B extends BarProps<D>>({
  className,
  data,
  series,
  showYAxis = true,
  density = 'mid',
  barCategoryGap = '20%',
  barSize,
  yDomainLeft,
  yDomainRight,
  yTypeLeft,
  yTypeRight,
  allowYDecimals = false,
  disableAnimation = false,
  children,
  ...otherProps
}: PropsClassChildren & BarChartProps<D, B>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(disableAnimation);
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
    series,
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
      cursorStyle={{ strokeWidth: 0 }}
      renderChart={children => (
        <ReBarChart
          data={data}
          accessibilityLayer
          barCategoryGap={barCategoryGap}
          barSize={barSize}
        >
          {children}
        </ReBarChart>
      )}
    >
      <>
        {showYAxis && hasRightY && (
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={yDomainRight}
            type={yTypeRight}
            tickCount={DENSITIES[density]}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
            allowDecimals={allowYDecimals}
          />
        )}

        {showYAxis && hasLeftY && (
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={yDomainLeft}
            type={yTypeLeft}
            tickCount={DENSITIES[density]}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            width={yAxisWidthNotBiaxial}
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
            allowDecimals={allowYDecimals}
          />
        )}

        {series.map(({
          dataKey,
          serieKeyId,
          stackId,
          side,
          color,
          unit,
          name,
        }, index) => {
          const computedStrokeColor = color ?? getChartDefaultColor(index);

          return (
            <Bar
              dataKey={dataKey}
              stackId={stackId}
              isAnimationActive={isAnimationActive}
              fill={computedStrokeColor}
              yAxisId={side}
              name={name}
              unit={unit}
              key={serieKeyId}
            />
          );
        })}
      </>
    </BaseChart>
  );
}

BarChart.displayName = 'BarChart';
