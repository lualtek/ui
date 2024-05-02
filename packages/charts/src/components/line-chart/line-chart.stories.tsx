import type { Meta, StoryObj } from '@storybook/react';

import {
  AnimatedLineSeries,
  Axis,
} from '@/charts';

import {
  LineChart,
} from './line-chart';

type Data = { x: string; y: number };
type Dataset = Data[];

const data1: Dataset = Array.from({ length: 26 }, (_, i) => ({
  x: `2020-01-${i + 1}`,
  y: Math.random() * 100,
}));

const data2: Dataset = Array.from({ length: 26 }, (_, i) => ({
  x: `2020-01-${i + 1}`,
  y: Math.random() * 100,
}));

const accessors = {
  xAccessor: (d: Data) => d.x,
  yAccessor: (d: Data) => d.y,
};

const meta = {
  title: 'Charts/Linear',
  component: LineChart,
  args: {
    accessors,
    showGrid: true,
    showBottomAxis: true,
    hideTicks: false,
    ticks: 5,
  },
  render: args => (
    <LineChart {...args}>
      <Axis orientation="right" />
      <AnimatedLineSeries
        dataKey="data1"
        data={data1}
        xAccessor={args.accessors.xAccessor}
        yAccessor={args.accessors.yAccessor}
      />
      <AnimatedLineSeries
        dataKey="data2"
        data={data2}
        xAccessor={args.accessors.xAccessor}
        yAccessor={args.accessors.yAccessor}
      />
    </LineChart>
  ),
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
