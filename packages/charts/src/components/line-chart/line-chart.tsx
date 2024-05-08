import { PropsClassChildren } from '@lualtek/react-components';
import {
  Line,
  LineChart as ReLineChart,
  YAxis,
} from 'recharts';
import { Except } from 'type-fest';

import { BaseChart, BaseChartProps } from '../base-chart';

type DataBaseType = Record<string, string | number>;

type LineChartLineBaseType<D> = {
  dataKey: string | ((data: D) => string | number);
  // Used on the map as linekey id, should be unique
  lineKeyId: string;
  orientation: 'left' | 'right';
  stroke?: string;
  unit: string;
  name: string;
};

export type LineChartProps<D extends DataBaseType, L extends LineChartLineBaseType<D>> = Except<
BaseChartProps, 'renderChart' | 'children'> & {
  data: D[];
  lines: L[];
  showDots?: boolean;
}

export function LineChart<D extends DataBaseType, L extends LineChartLineBaseType<D>>({
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
        tickLine={{ stroke: 'var(--dimmed-4)' }}
        axisLine={{ stroke: 'var(--dimmed-4)' }}
      />
      <YAxis
        yAxisId="left"
        orientation="left"
        tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
        tickLine={{ stroke: 'var(--dimmed-4)' }}
        axisLine={{ stroke: 'var(--dimmed-4)' }}
      />
      <>
        {lines.map(({
          dataKey,
          lineKeyId,
          orientation,
          stroke,
          unit,
          name,
        }) => (
          <Line
            key={lineKeyId}
            dataKey={dataKey}
            yAxisId={orientation}
            type="monotone"
            stroke={stroke}
            name={name}
            unit={unit}
            dot={showDots ? {
              r: 3,
              stroke,
              fill: 'var(--global-background)',
            } : false}
            activeDot={{
              fill: 'var(--global-foreground)', stroke: 'var(--global-background)', strokeWidth: 4, r: 6,
            }}
          />
        ))}
      </>
    </BaseChart>
  );
}

LineChart.displayName = 'LineChart';
