import { PropsClassChildren } from '@lualtek/react-components';
import {
  Line,
  LineChart as ReLineChart,
  YAxis,
} from 'recharts';
import { Except } from 'type-fest';

import { BaseChart, BaseChartProps } from '../base-chart';

type DataBaseType = Record<string, string | number>;

export type LineType<D> = {
  dataKey: string | ((data: D) => string | number);
  // Used on the map as linekey id, should be unique
  lineKeyId: string;
  side: 'left' | 'right';
  stroke?: string;
  unit: string;
  name: string;
};

export type LineChartProps<D extends DataBaseType, L extends LineType<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  data: D[];
  lines: L[];
  showDots?: boolean;
}

export function LineChart<D extends DataBaseType, L extends LineType<D>>({
  className,
  data,
  lines,
  showDots = false,
  children,
  ...otherProps
}: PropsClassChildren & LineChartProps<D, L>) {
  return (
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
      <YAxis
        yAxisId="right"
        orientation="right"
        tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
        tickLine={{ stroke: 'var(--dimmed-2)' }}
        axisLine={{ stroke: 'var(--dimmed-2)' }}
      />
      <YAxis
        yAxisId="left"
        orientation="left"
        tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
        tickLine={{ stroke: 'var(--dimmed-2)' }}
        axisLine={{ stroke: 'var(--dimmed-2)' }}
      />
      <>
        {lines.map(({
          dataKey,
          lineKeyId,
          side,
          stroke,
          unit,
          name,
        }) => (
          <Line
            key={lineKeyId}
            dataKey={dataKey}
            yAxisId={side}
            connectNulls
            type="monotone"
            stroke={stroke}
            name={name}
            unit={unit}
            dot={showDots ? {
              r: 3,
              stroke,
              fill: stroke,
            } : false}
            activeDot={{
              fill: stroke, stroke: 'var(--global-background)', strokeWidth: 4, r: 6,
            }}
          />
        ))}
      </>
    </BaseChart>
  );
}

LineChart.displayName = 'LineChart';
