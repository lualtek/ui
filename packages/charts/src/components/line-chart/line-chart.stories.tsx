import type { Meta, StoryObj } from '@storybook/react';

import {
  AnimatedAxis,
  AnimatedLineSeries,
} from '@/charts';

import {
  LineChart,
} from './line-chart';

type Data = { x: string; y: number };
type Dataset = Data[];

const data1: Dataset = [
  { x: '2020-01-01', y: Math.random() * 100 },
  { x: '2020-01-02', y: Math.random() * 100 },
  { x: '2020-01-03', y: Math.random() * 100 },
  { x: '2020-01-04', y: Math.random() * 100 },
  { x: '2020-01-05', y: Math.random() * 100 },
  { x: '2020-01-06', y: Math.random() * 100 },
  { x: '2020-01-07', y: Math.random() * 100 },
  { x: '2020-01-08', y: Math.random() * 100 },
  { x: '2020-01-09', y: Math.random() * 100 },
  { x: '2020-01-10', y: Math.random() * 100 },
  { x: '2020-01-11', y: Math.random() * 100 },
  { x: '2020-01-12', y: Math.random() * 100 },
  { x: '2020-01-13', y: Math.random() * 100 },
  { x: '2020-01-14', y: Math.random() * 100 },
  { x: '2020-01-15', y: Math.random() * 100 },
  { x: '2020-01-16', y: Math.random() * 100 },
  { x: '2020-01-17', y: Math.random() * 100 },
  { x: '2020-01-18', y: Math.random() * 100 },
  { x: '2020-01-19', y: Math.random() * 100 },
  { x: '2020-01-20', y: Math.random() * 100 },
  { x: '2020-01-21', y: Math.random() * 100 },
  { x: '2020-01-22', y: Math.random() * 100 },
  { x: '2020-01-23', y: Math.random() * 100 },
  { x: '2020-01-24', y: Math.random() * 100 },
  { x: '2020-01-25', y: Math.random() * 100 },
  { x: '2020-01-26', y: Math.random() * 100 },
];

const data2: Dataset = [
  { x: '2020-01-01', y: Math.random() * 100 },
  { x: '2020-01-02', y: Math.random() * 100 },
  { x: '2020-01-03', y: Math.random() * 100 },
  { x: '2020-01-04', y: Math.random() * 100 },
  { x: '2020-01-05', y: Math.random() * 100 },
  { x: '2020-01-06', y: Math.random() * 100 },
  { x: '2020-01-07', y: Math.random() * 100 },
  { x: '2020-01-08', y: Math.random() * 100 },
  { x: '2020-01-09', y: Math.random() * 100 },
  { x: '2020-01-10', y: Math.random() * 100 },
  { x: '2020-01-11', y: Math.random() * 100 },
  { x: '2020-01-12', y: Math.random() * 100 },
  { x: '2020-01-13', y: Math.random() * 100 },
  { x: '2020-01-14', y: Math.random() * 100 },
  { x: '2020-01-15', y: Math.random() * 100 },
  { x: '2020-01-16', y: Math.random() * 100 },
  { x: '2020-01-17', y: Math.random() * 100 },
  { x: '2020-01-18', y: Math.random() * 100 },
  { x: '2020-01-19', y: Math.random() * 100 },
  { x: '2020-01-20', y: Math.random() * 100 },
  { x: '2020-01-21', y: Math.random() * 100 },
  { x: '2020-01-22', y: Math.random() * 100 },
  { x: '2020-01-23', y: Math.random() * 100 },
  { x: '2020-01-24', y: Math.random() * 100 },
  { x: '2020-01-25', y: Math.random() * 100 },
  { x: '2020-01-26', y: Math.random() * 100 },
];

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
  },
  render: args => (
    <LineChart {...args}>
      <AnimatedAxis orientation="left" />
      <AnimatedAxis orientation="right" />
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
