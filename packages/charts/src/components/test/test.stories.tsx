import type { Meta, StoryObj } from '@storybook/react';
import {
  AnimatedLineSeries,
} from '@visx/xychart';

import { LinearChart } from './test';

type Data = { x: string; y: number };
type Dataset = Data[];

const data1: Dataset = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2: Dataset = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: (d: Data) => d.x,
  yAccessor: (d: Data) => d.y,
};

const meta = {
  title: 'Charts/Linear',
  component: LinearChart,
  args: {
    accessors,
  },
  render: args => (
    <LinearChart {...args}>
      <AnimatedLineSeries
        dataKey="data1"
        data={data1}
        xAccessor={accessors.xAccessor}
        yAccessor={accessors.yAccessor}
      />
      <AnimatedLineSeries
        dataKey="data2"
        data={data2}
        xAccessor={accessors.xAccessor}
        yAccessor={accessors.yAccessor}
      />
    </LinearChart>
  ),
} satisfies Meta<typeof LinearChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
