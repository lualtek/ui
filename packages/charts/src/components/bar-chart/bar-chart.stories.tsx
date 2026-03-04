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

import { Stack, Text, Title } from '@lualtek/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useCallback, useEffect } from 'storybook/preview-api';
import { Brush, ReferenceLine } from '@/charts/components';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import type { ChartDataBaseType } from '../base-chart/base-chart';
import { getChartDefaultColor } from '../base-chart/colors';
import type { BarChartProps, BarProps } from './bar-chart';
import { BarChart } from './bar-chart';

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
  render: (args: BarChartProps<Data, BarProps<Data>>) => <BarChart {...args} />,
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
    referenceComponent: data.map((d) => (
      <ReferenceLine key="linea-1" x={d.x} color="red" label="Evento 1" yAxisId="left" />
    )),
  },
} satisfies Story;

export const StackedBars = {
  args: {
    series: [
      {
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
      },
    ],
  },
} satisfies Story;

export const WithCustomDataset = {
  args: {
    data: MultiAxisData.data,
    series: MultiAxisData.series as Array<BarProps<Data>>,
  },
} satisfies Story;

export const WithExternalTooltip = {
  args: {
    showTooltip: false,
  },
  render: (args: BarChartProps<Data, BarProps<Data>>) => {
    const [{ tooltip }, setArgs] = useArgs<typeof args & { tooltip: Data }>();

    useEffect(() => {
      if (args.data.length > 0) {
        setArgs({
          tooltip: args.data[args.data.length - 1],
        });
      }
    }, [args.data, args.data.length, setArgs]);

    const handleChartUpdate = useCallback(
      (state: any) => {
        if (!state) return;

        if (state.activePayload && state.activePayload.length > 0) {
          const payload = state.activePayload[0].payload as Data;
          if (tooltip?.x !== payload.x) {
            setArgs({
              tooltip: payload,
            });
          }
        } else if (state.activeTooltipIndex !== undefined && state.activeTooltipIndex !== null) {
          const index = Number(state.activeTooltipIndex);
          const point = args.data[index];
          if (point && tooltip?.x !== point.x) {
            setArgs({
              tooltip: point,
            });
          }
        }
      },
      [tooltip, args.data, setArgs],
    );

    return (
      <Stack direction="column">
        <Stack rowGap={8}>
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
                    <Text weight="bold" style={{ minWidth: 100 }}>
                      {Number(tooltip[item.dataKey as keyof Data]).toFixed(2)}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Stack>
        <BarChart {...args} handleChartUpdate={handleChartUpdate} />
      </Stack>
    );
  },
} satisfies Story;

export const WithBrush = {
  args: {
    showXAxis: true,
  },
  render: (args: BarChartProps<Data, BarProps<Data>>) => (
    <BarChart {...args}>
      <Brush />
    </BarChart>
  ),
} satisfies Story;
