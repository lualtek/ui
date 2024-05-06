import { FCChildrenClass } from '@lualtek/react-components';
import {
  Line,
  LineChart as ReLineChart,
  YAxis,
} from 'recharts';
import { Except } from 'type-fest';

import { BaseChart, BaseChartProps } from '../base-chart';

type LineChartProps<T extends Record<string, unknown>> = Except<BaseChartProps, 'renderChart' | 'children'> & {
  data: T[];
}

export const LineChart: FCChildrenClass<LineChartProps<Record<string, unknown>>> = ({
  className,
  data,
  children,
  ...otherProps
}) => (
  <BaseChart
    {...otherProps}
    renderChart={children => (
      <ReLineChart
        data={data}
      >
        {children}
      </ReLineChart>
    )}
  >
    <YAxis
      dataKey="y"
      orientation="right"
      tick={{ fill: 'var(--dimmed-4)', fontSize: '0.8em' }}
      tickLine={{ stroke: 'var(--dimmed-4)' }}
    />
    <Line type="monotone" dataKey="y" stroke="#82ca9d" />
  </BaseChart>
);

LineChart.displayName = 'LineChart';
