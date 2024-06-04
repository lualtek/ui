import type { Meta, StoryObj } from '@storybook/react';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import {
  LineChart,
  LineProps,
} from './line-chart';

type Data = Record<string, number | string>;

const { data } = SimpleData;

const meta = {
  title: 'Data Viz/Linear Chart',
  component: LineChart,
  args: {
    data,
    series: [{
      dataKey: 'y',
      serieKeyId: 'y',
      side: 'left',
    }],
    showGrid: true,
    showDots: false,
    showYAxis: true,
    showXAxis: false,
    showAreas: false,
    density: 'mid',
  },
  argTypes: {
    data: { table: { disable: true } },
    series: { table: { disable: true } },
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

export const withNoAnimation = {
  args: {
    disableAnimation: true,
  },
} satisfies Story;

export const WithCustomDataset = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<LineProps<Data>>,
  },
} satisfies Story;

export const WithAreas = {
  args: {
    showAreas: true,
  },
} satisfies Story;

