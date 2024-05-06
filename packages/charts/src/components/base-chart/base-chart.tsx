import { FCChildrenClass, Stack, Text } from '@lualtek/react-components';
import { ReactElement, ReactNode } from 'react';
import {
  CartesianGrid,
  Legend,
  // Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxisProps,
} from 'recharts';

export type BaseChartProps = {
  dataKeyX?: string | ((data: any) => string | number);
  showGrid?: boolean;
  height?: number;
  showBottomAxis?: boolean;
  ticks?: YAxisProps['tickCount'];
  renderChart: (children: ReactNode) => ReactElement;
  children: ReactElement | ReactElement[];
};

export const BaseChart: FCChildrenClass<BaseChartProps> = ({
  className,
  children,
  showGrid = true,
  height = 300,
  showBottomAxis = true,
  dataKeyX = 'x',
  ticks = 8,
  renderChart,
  ...otherProps
}) => (
  <div className={className}>
    <ResponsiveContainer
      width="100%"
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
          <XAxis
            dataKey={dataKeyX}
            tickCount={ticks}
            hide={!showBottomAxis}
            minTickGap={32}
            tick={{ fill: 'var(--dimmed-3)', fontSize: '0.8em' }}
            tickLine={{ stroke: 'var(--dimmed-3)' }}
            tickSize={8}
            tickMargin={8}
          />
          {children}
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
        </>,
      )}
    </ResponsiveContainer>
  </div>
);

BaseChart.displayName = 'XYChart';
