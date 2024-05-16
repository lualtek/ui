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
   * The unit assigned to the line value
   */
  unit?: string;
  /**
   * A custom name/label for the value
   */
  name?: string;
};

export type BarChartProps<D extends ChartDataBaseType, L extends BarProps<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  /**
   * The data to render.
   */
  data: D[];
  /**
   * The chart series/series to render.
   */
  series: L[];
  /**
   * Whether to show the Y axis.
   *
   * @defaultValue true
   */
  showYAxis?: boolean;
}

export function BarChart<D extends ChartDataBaseType, L extends BarProps<D>>({
  className,
  data,
  series,
  showYAxis = true,
  density = 'mid',
  children,
  ...otherProps
}: PropsClassChildren & BarChartProps<D, L>) {
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
      renderChart={children => (
        <ReBarChart
          data={data}
          accessibilityLayer
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

        {series.map(({
          dataKey,
          lineKeyId,
          side,
          stroke,
          unit,
          name,
        }, index) => {
          const computedStrokeColor = stroke ?? getChartDefaultColor(index);

          return (
            <Bar
              dataKey={dataKey}
              yAxisId={side}
              isAnimationActive={isAnimationActive}
              fill={computedStrokeColor}
              name={name}
              unit={unit}
              key={lineKeyId}
            />
          );
        })}
      </>
    </BaseChart>
  );
}

BarChart.displayName = 'BarChart';
