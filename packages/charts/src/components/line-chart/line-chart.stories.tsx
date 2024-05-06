import type { Meta, StoryObj } from '@storybook/react';

import {
  LineChart,
} from './line-chart';

type Data = { x: string; y: number };
type Dataset = Data[];

const data: Dataset = Array.from({ length: 26 }, (_, i) => ({
  x: `2020-01-${i + 1}`,
  y: Math.random() * 100,
}));

const meta = {
  title: 'Charts/Linear',
  component: LineChart,
  args: {
    data,
    showGrid: true,
    showBottomAxis: true,
    ticks: 5,
  },
  render: args => (
    <LineChart {...args} />
  ),
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
