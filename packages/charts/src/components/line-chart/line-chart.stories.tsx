import type { Meta, StoryObj } from '@storybook/react';

import MultiAxisData from '../../../fixtures/multi-y-data';
import {
  LineChart,
  LineProps,
} from './line-chart';

type Data = Record<string, number | string>;
type Dataset = Data[];

const data: Dataset = Array.from({ length: 26 }, (_, i) => ({
  x: `2020-01-${i + 1}`,
  y: Math.random() * 100,
}));

const meta = {
  title: 'Data Viz/Linear',
  component: LineChart,
  args: {
    data,
    lines: [{
      dataKey: 'y',
      lineKeyId: 'y',
      side: 'left',
    }],
    showGrid: true,
    showDots: false,
    showYAxis: true,
    showXAxis: false,
    density: 'mid',
  },
  argTypes: {
    data: { table: { disable: true } },
    lines: { table: { disable: true } },
    density: {
      control: {
        type: 'inline-radio',
        options: ['low', 'mid', 'high'],
      },
    },
  },
  render: args => (
    <LineChart {...args} />
  ),
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithFixedSize = {
  args: {
    width: 300,
    height: 100,
    showGrid: false,
    showYAxis: false,
    showTooltip: false,
  },
} satisfies Story;

export const WithMinWidth = {
  args: {
    minWidth: 800,
    showGrid: false,
    showYAxis: false,
    showTooltip: false,
  },
} satisfies Story;

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

export const WidthXPadding = {
  args: {
    xPadding: 32,
  },
} satisfies Story;

export const WithCustomDataset = {
  args: {
    data: MultiAxisData.data,
    lines: MultiAxisData.lines as Array<LineProps<Data>>,
    isBiAxial: true,
  },
} satisfies Story;

