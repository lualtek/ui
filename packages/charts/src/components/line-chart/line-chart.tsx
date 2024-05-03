import { FCChildrenClass } from '@lualtek/react-components';

import { BaseXYChart, BaseXYChartProps } from '../base-xy-chart';

export type LineChartProps<T> = BaseXYChartProps<T>

export const LineChart: FCChildrenClass<LineChartProps<any>> = ({
  className,
  accessors,
  children,
  ...otherProps
}) => (
  <BaseXYChart accessors={accessors} className={className} {...otherProps}>
    {children}
  </BaseXYChart>
);

LineChart.displayName = 'LineChart';
