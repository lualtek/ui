import { PropsClassChildren } from '@lualtek/react-components';
import {
  useEffect, useRef, useState, useTransition,
} from 'react';
import {
  Line,
  LineChart as ReLineChart,
  YAxis,
} from 'recharts';
import { Except } from 'type-fest';

import { BaseChart, BaseChartProps } from '../base-chart';
import { getChartDefaultColor } from '../base-chart/colors';

type DataBaseType = Record<string, string | number>;

export type LineProps<D> = {
  dataKey: string | ((data: D) => string | number);
  // Used on the map as linekey id, should be unique
  lineKeyId: string;
  side: 'left' | 'right';
  stroke?: string;
  unit: string;
  name: string;
};

export type LineChartProps<D extends DataBaseType, L extends LineProps<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  data: D[];
  lines: L[];
  isBiAxial?: boolean;
  showDots?: boolean;
  showYAxis?: boolean;
}

export function LineChart<D extends DataBaseType, L extends LineProps<D>>({
  className,
  data,
  lines,
  showDots = false,
  showYAxis = true,
  isBiAxial,
  children,
  ...otherProps
}: PropsClassChildren & LineChartProps<D, L>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const currentChartRef = chartRef?.current;
    let chartWidth: number;

    if (currentChartRef) {
      chartWidth = chartRef.current.clientWidth;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const cr: DOMRectReadOnly = entry.contentRect;
        if (chartWidth !== cr.width) {
          startTransition(() => {
            setIsAnimationActive(false);
          });
        }
      });
    });

    if (currentChartRef) {
      resizeObserver.observe(currentChartRef);
    }

    return () => {
      if (currentChartRef) {
        resizeObserver.unobserve(currentChartRef);
      }
    };
  }, []);

  return (
    <div ref={chartRef}>
      <BaseChart
        {...otherProps}
        renderChart={children => (
          <ReLineChart
            data={data}
            accessibilityLayer
          >
            {children}
          </ReLineChart>
        )}
      >
        {showYAxis && isBiAxial && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
          />
        )}

        {showYAxis && (
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-2)' }}
            axisLine={{ stroke: 'var(--dimmed-2)' }}
          />
        )}
        <>
          {lines.map(({
            dataKey,
            lineKeyId,
            side,
            stroke,
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
                type="monotone"
                stroke={computedStrokeColor}
                name={name}
                unit={unit}
                dot={showDots ? {
                  r: 3,
                  stroke: computedStrokeColor,
                  fill: computedStrokeColor,
                } : false}
                activeDot={{
                  fill: computedStrokeColor, stroke: 'var(--global-background)', strokeWidth: 4, r: 6,
                }}
              />
            );
          })}
        </>
      </BaseChart>
    </div>
  );
}

LineChart.displayName = 'LineChart';
