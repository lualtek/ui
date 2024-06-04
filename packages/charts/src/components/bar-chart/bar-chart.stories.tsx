import type { Meta, StoryObj } from '@storybook/react';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import {
  BarChart,
  BarProps,
} from './bar-chart';

type Data = Record<string, number | string | null>;

const { data } = SimpleData;

const meta = {
  title: 'Data Viz/Bar Chart',
  component: BarChart,
  args: {
    data,
    series: [{
      dataKey: 'y',
      serieKeyId: 'y',
      side: 'left',
    }, {
      dataKey: 'z',
      serieKeyId: 'z',
      side: 'left',
    },
    ],
    showGrid: true,
    showYAxis: true,
    showXAxis: false,
    density: 'high',
    barCategoryGap: '20%',
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
    <BarChart {...args} />
  ),
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomBarSize = {
  args: {
    barSize: 2,
  },
} satisfies Story;

export const StackedBars = {
  args: {
    series: [{
      dataKey: 'y',
      serieKeyId: 'y',
      stackId: 'stack',
      side: 'left',
    },
    {
      dataKey: 'z',
      serieKeyId: 'z',
      stackId: 'stack',
      side: 'left',
    }],
  },
} satisfies Story;

export const WithCustomDataset = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<BarProps<Data>>,
  },
} satisfies Story;
