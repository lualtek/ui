import { Chip, Stack, Text, Title } from '@lualtek/react-components';
import { useArgs } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SimpleData from '../../../fixtures/data';
import { MultiDataSeries } from '../../../fixtures/multi-data-axes';
import MultiAxisData from '../../../fixtures/multi-y-data';
import { ReferenceArea, ReferenceLine } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import {
  LineChart, LineChartProps,
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
    xType: undefined,
    yTypeLeft: undefined,
    yTypeRight: undefined,
    showTooltip: false,
  },
  parameters: {
    react: { rsc: true },
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
  render: (args: LineChartProps<any, any>) => (
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

export const WithCustomYDomain = {
  args: {
    yDomainLeft: [0, 1000],
  },
} satisfies Story;

export const WithFormattedXLabels = {
  args: {
    xFormatter: value => `${value} Formatted`,
  },
} satisfies Story;


export const WithMultiDataAxes = {
  args: {
    data: undefined,
    series: MultiDataSeries,
    dataKeyX: 'category',
    xType: 'category',
    xAllowDuplicatedCategory: false,
    yDomainLeft: [0, 1],
  },
} satisfies Story;

export const WithExternalTooltip = {
  args: {
    // @ts-expect-error: this is a story arg, not a prop
    tooltip: null,
    showTooltip: false,
  },
  render: (args: LineChartProps<any, any>) => {
    // eslint-disable-next-line
    const [{ tooltip }, setArgs] = useArgs<typeof args & { tooltip: any }>();

    return (
      <Stack direction="column">
        <Stack direction="column" rowGap={8} style={{ height: 100 }}>
          {tooltip && (
            <>
              <Title level="3">{tooltip.label}</Title>
              {tooltip.payload.map((item: any) => (
                <Stack key={item.name} direction="row" columnGap={8} vAlign="center">
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: item.color,
                      borderRadius: 2,
                    }}
                  />
                  <Text>{item.name}:</Text>
                  <Text weight="bold">{item.value}</Text>
                </Stack>
              ))}
            </>
          )}
        </Stack>
        <LineChart
          {...args}
          handleChartUpdate={(data: any) => {
            if (data?.activePayload) {
              const sanitizedPayload = data.activePayload.map((item: any) => ({
                name: item.name,
                value: item.value,
                color: item.color,
              }));
              setArgs({
                tooltip: {
                  label: data.activeLabel,
                  payload: sanitizedPayload,
                },
              });
            } else {
              setArgs({ tooltip: null });
            }
          }}
        />
      </Stack>
    );
  },
} satisfies Story;
