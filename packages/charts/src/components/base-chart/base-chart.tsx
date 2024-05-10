import { PropsClassChildren, Stack, Text } from '@lualtek/react-components';
import { forwardRef, ReactElement, ReactNode } from 'react';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip as ReTooltip,
  XAxis,
  YAxisProps,
} from 'recharts';
import { Except } from 'type-fest';

import { Tooltip, TooltipProps } from '../tooltip';

export type ChartDataBaseType = Record<string, string | number>;

export type BaseChartProps = Except<ResponsiveContainerProps, 'children'> & {
  dataKeyX?: string | ((data: ChartDataBaseType) => string | number);
  showGrid?: boolean;
  showXAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  ticks?: YAxisProps['tickCount'];
  renderChart: (children: ReactNode) => ReactElement;
  customTooltip?: (props: TooltipProps) => JSX.Element;
  children: ReactNode;
  xPadding?: number;
};

export const BaseChart = forwardRef<HTMLDivElement, PropsClassChildren<BaseChartProps>>(({
  className,
  children,
  showGrid = true,
  height = 300,
  showXAxis = false,
  showTooltip = true,
  showLegend = false,
  dataKeyX = 'x',
  xPadding = 0,
  ticks = 8,
  renderChart,
  customTooltip,
  ...otherProps
}, forwardedRef) => (
  <div ref={forwardedRef} className={className}>
    <ResponsiveContainer
      width="100%"
      debounce={0}
      height={height}
      {...otherProps}
    >
      {renderChart(
        <>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="color-mix(in oklch, var(--global-foreground), transparent 80%)"
            />
          )}
          {showTooltip && (
            <ReTooltip
              cursor={{ stroke: 'var(--dimmed-3)', strokeWidth: 2 }}
              content={customTooltip ?? Tooltip}
            />
          )}
          <XAxis
            dataKey={dataKeyX}
            tickCount={ticks}
            hide={!showXAxis}
            minTickGap={32}
            tick={{ fill: 'var(--dimmed-3)', fontSize: '0.8em' }}
            padding={{ left: xPadding, right: xPadding }}
            tickLine={{ stroke: 'var(--dimmed-3)' }}
            axisLine={{ stroke: 'var(--dimmed-4)' }}
            tickSize={8}
            allowDataOverflow
            tickMargin={8}
          />
          {children}
          {showLegend && (
            <Legend
              align="right"
              iconType="plainline"
              formatter={(value, entry) => {
                const { color } = entry;
                return (
                  <Stack inline fill={false} vPadding={8}>
                    <Text as="span" size={14} style={{ color }}>{value}</Text>
                  </Stack>
                );
              }}
            />
          )}
        </>,
      )}
    </ResponsiveContainer>
  </div>
));

BaseChart.displayName = 'XYChart';
