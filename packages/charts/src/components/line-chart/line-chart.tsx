import { FCChildrenClass } from '@lualtek/react-components';

import { BaseXYChart, BaseXYChartProps } from '../base-xy-chart';

export type LineChartProps = BaseXYChartProps

export const LineChart: FCChildrenClass<LineChartProps> = ({
  className,
  accessors,
  children,
  ...otherProps
}) => (
  <BaseXYChart accessors={accessors} {...otherProps}>
    {children}
  </BaseXYChart>
);

LineChart.displayName = 'LineChart';
