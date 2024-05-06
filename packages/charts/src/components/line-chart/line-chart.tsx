import { FCChildrenClass } from '@lualtek/react-components';
import { AnimatedLineSeries, Axis } from '@visx/xychart';

import { BaseXYChart, BaseXYChartProps } from '../base-xy-chart';

type LineChartDataType = {
  [y: string]: number | string;
  x: string;
};

type LineChartProps<T extends LineChartDataType> = BaseXYChartProps & {
  data: T[];
  lines: Array<{
    payloadKey: string;
    payloadType: string;
  }>;
}

export const LineChart: FCChildrenClass<LineChartProps<LineChartDataType>> = ({
  className,
  data,
  lines,
  children,
  ...otherProps
}) => (
  <BaseXYChart className={className} {...otherProps}>
    <Axis orientation="left" />
    {lines.map(({ payloadKey }) => (
      <AnimatedLineSeries
        key={payloadKey}
        dataKey={payloadKey}
        data={data}
        xAccessor={d => d.x}
        yAccessor={d => d[payloadKey]}
      />
    ))}
    {children}
  </BaseXYChart>
);

LineChart.displayName = 'LineChart';
