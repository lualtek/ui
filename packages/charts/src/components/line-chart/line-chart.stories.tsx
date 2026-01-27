import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useCallback, useEffect } from 'storybook/preview-api';
import { Chip, Stack, Text, Title } from '@lualtek/react-components';
import SimpleData from '../../../fixtures/data';
import { MultiDataSeries } from '../../../fixtures/multi-data-axes';
import MultiAxisData from '../../../fixtures/multi-y-data';
import { ReferenceArea, ReferenceLine } from '../base-chart';
import { ChartDataBaseType } from '../base-chart/base-chart';
import { getChartDefaultColor } from '../base-chart/colors';
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
  render: (args: LineChartProps<Data, LineProps<Data>>) => (
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
    customTooltip: ({ label }: any) => (
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
    formatTooltipName: ({ name }: any) => `Formatted ${name}`,
    formatTooltipValue: ({ value }: any) => `${value}.00`,
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
    tooltipDecorator: (entry: any) => (
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
    xFormatter: (value: any) => `${value} Formatted`,
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
    showTooltip: false,
  },
  render: (args: LineChartProps<any, any>) => {
    // eslint-disable-next-line
    const [{ tooltip }, setArgs] = useArgs<typeof args & { tooltip: Data }>();

    useEffect(() => {
      if (args.data && args.data.length > 0) {
        setArgs({
          tooltip: args.data[args.data.length - 1],
        });
      }
    }, []);

    const handleChartUpdate = useCallback((state: any) => {
      if (!state) return;

      if (state.activePayload && state.activePayload.length > 0) {
        const payload = state.activePayload[0].payload as Data;
        if (tooltip?.x !== payload.x) {
          setArgs({
            tooltip: payload,
          });
        }
      } else if (
        state.activeTooltipIndex !== undefined &&
        state.activeTooltipIndex !== null
      ) {
        const index = Number(state.activeTooltipIndex);
        const point = args.data?.[index];
        if (point && tooltip?.x !== point.x) {
          setArgs({
            tooltip: point,
          });
        }
      }
    }, [tooltip, args.data, setArgs]);

    return (
      <Stack direction="column">
        <Stack rowGap={8} style={{ height: 100 }}>
          {tooltip && (
            <>
              <Title level="4">{tooltip.x}</Title>
              <Stack direction="row" fill={false} columnGap={16}>
                {args.series.map((item: any, index: number) => (
                  <Stack fill={false} key={item.dataKey} direction="row" columnGap={8} vAlign="center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color ?? getChartDefaultColor(index),
                        borderRadius: 2,
                      }}
                    />
                    <Text>{item.dataKey}:</Text>
                    <Text weight="bold" style={{ minWidth: 100 }}>{Number(tooltip[item.dataKey as keyof Data]).toFixed(2)}</Text>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Stack>
        <LineChart
          {...args}
          handleChartUpdate={handleChartUpdate}
        />
      </Stack>
    );
  },
} satisfies Story;
