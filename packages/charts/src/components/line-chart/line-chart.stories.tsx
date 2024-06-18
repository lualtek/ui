import { Chip } from '@lualtek/react-components';
import type { Meta, StoryObj } from '@storybook/react';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import { ReferenceArea, ReferenceLine } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import {
  LineChart,
  LineProps,
} from './line-chart';

type Data = ChartDataBaseType;

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

export const WithFormattedTooltip = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<LineProps<Data>>,
    formatTooltipName: ({ name }) => `Formatted ${name}`,
    formatTooltipValue: ({ value }) => `${value}.00`,
  },

} satisfies Story;

export const WithoutTooltipColors = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<LineProps<Data>>,
    tooltipColors: false,
  },

} satisfies Story;

export const WithTooltipDecorator = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<LineProps<Data>>,
    tooltipDecorator: entry => (
      <Chip>{Number(entry.value).toFixed(0)}</Chip>
    ),
  },
} satisfies Story;

export const WithAreas = {
  args: {
    showAreas: true,
  },
} satisfies Story;

export const WithReferenceLines = {
  args: {
    referenceComponent: [
      <ReferenceLine yAxisId="left" color="red" key="line1" y={40} />,
      <ReferenceLine yAxisId="left" key="line2" y={80} dashed />,
    ],
  },
} satisfies Story;

export const WithReferenceAreas = {
  args: {
    referenceComponent: [
      <ReferenceArea yAxisId="left" key="area1" y1={0} y2={40} label="low" />,
      <ReferenceArea yAxisId="left" color="cyan" key="area2" y1={40} y2={70} label="medium" />,
    ],
  },
} satisfies Story;

export const WithReferenceAreasAndLines = {
  args: {
    referenceComponent: [
      <ReferenceLine
        yAxisId="left"
        key="line1"
        y={40}
        dashed
        color="var(--highlight-green-foreground)"
      />,
      <ReferenceLine
        yAxisId="left"
        key="line2"
        y={70}
        dashed
        color="var(--highlight-yellow-foreground)"
      />,
      <ReferenceLine
        yAxisId="left"
        key="line2"
        y={100}
        dashed
        color="var(--highlight-red-foreground)"
      />,
      <ReferenceArea
        yAxisId="left"
        color="var(--highlight-green-background)"
        key="area1"
        y1={0}
        y2={40}
        label="low"
      />,
      <ReferenceArea
        yAxisId="left"
        color="var(--highlight-yellow-background)"
        key="area2"
        y1={40}
        y2={70}
        label="medium"
      />,
      <ReferenceArea
        yAxisId="left"
        color="var(--highlight-red-background)"
        key="area2"
        y1={70}
        y2={100}
        label="medium"
      />,
    ],
  },
} satisfies Story;

