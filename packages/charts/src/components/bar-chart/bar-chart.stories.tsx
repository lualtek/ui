/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { map } from 'recharts/types/util/scale/util/utils';

import { ReferenceLine } from '@/charts/components';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import { ChartDataBaseType } from '../base-chart/base-chart';
import {
  BarChart,
  BarProps,
} from './bar-chart';

type Data = ChartDataBaseType;

const { data } = SimpleData;

const meta = {
  title: 'Data Viz/Bar Chart',
  component: BarChart,
  args: {
    data,
    series: [
      {
        dataKey: 'y',
        serieKeyId: 'y',
        side: 'left',
      },
      {
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
    showTooltip: false,
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
  parameters: {
    react: { rsc: true },
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

export const WithReferenceLines = {
  args: {
    showXAxis: true,
    referenceComponent: data.map(d => (
      <ReferenceLine
        key="linea-1"
        x={d.x}
        color="red"
        label="Evento 1"
        yAxisId="left"
      />
    )),
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
