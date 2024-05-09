import type { Meta, StoryObj } from '@storybook/react';

import MultiAxisData from '../../../fixtures/multi-y-data';
import {
  LineChart,
  LineType,
} from './line-chart';

type Data = Record<string, number | string>;
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
    lines: [{
      dataKey: 'y',
      lineKeyId: 'y',
      orientation: 'left',
      unit: '°C',
      name: 'Temperature',
    }],
    showGrid: true,
    showDots: false,
    showBottomAxis: false,
    ticks: 5,
  },
  render: args => (
    <LineChart {...args} />
  ),
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithCustomTooltip = {
  args: {
    customTooltip: ({ label }) => (
      <div style={{ color: 'red' }}>
        {label}
      </div>
    ),
  },
} satisfies Story;

export const WithLegend = {
  args: {
    showLegend: true,
  },
} satisfies Story;

export const WithCustomDataset = {
  args: {
    data: MultiAxisData.data,
    lines: MultiAxisData.lines as Array<LineType<Data>>,
  },
} satisfies Story;

