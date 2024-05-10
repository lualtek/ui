import { PropsClassChildren } from '@lualtek/react-components';
import {
  useEffect, useRef, useState, useTransition,
} from 'react';
import {
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
  dataKey: string | ((data: D) => string | number);
  // Used on the map as linekey id, should be unique
  lineKeyId: string;
  side: 'left' | 'right';
  stroke?: string;
  type?: ReLineProps['type'];
  unit?: string;
  name?: string;
};

export type LineChartProps<D extends ChartDataBaseType, L extends LineProps<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  data: D[];
  lines: L[];
  showDots?: boolean;
  showYAxis?: boolean;
}

export function LineChart<D extends ChartDataBaseType, L extends LineProps<D>>({
  className,
  data,
  lines,
  showDots = false,
  showYAxis = true,
  density = 'mid',
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
      renderChart={children => (
        <ReLineChart
          data={data}
          accessibilityLayer
        >
          {children}
        </ReLineChart>
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

          return (
            <Line
              key={lineKeyId}
              dataKey={dataKey}
              yAxisId={side}
              isAnimationActive={isAnimationActive}
              connectNulls
              type={type ?? 'monotone'}
              stroke={computedStrokeColor}
              name={name}
              unit={unit}
              dot={showDots ? {
                r: 3,
                stroke: computedStrokeColor,
                fill: computedStrokeColor,
              } : false}
              activeDot={{
                fill: showDots ? 'var(--global-foreground)' : computedStrokeColor,
                stroke: 'var(--global-background)',
                strokeWidth: 4,
                r: 6,
              }}
            />
          );
        })}
      </>
    </BaseChart>
  );
}

LineChart.displayName = 'LineChart';
