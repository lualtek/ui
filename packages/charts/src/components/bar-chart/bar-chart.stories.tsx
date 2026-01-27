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
import { useArgs, useCallback, useEffect } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReferenceLine } from '@/charts/components';
import { getChartDefaultColor } from '../base-chart/colors';

import SimpleData from '../../../fixtures/data';
import MultiAxisData from '../../../fixtures/multi-y-data';
import { ChartDataBaseType } from '../base-chart/base-chart';
import {
  BarChart,
  BarChartProps,
  BarProps,
} from './bar-chart';
import { ReactNode } from 'react';

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
  render: (args: BarChartProps<Data, BarProps<Data>>) => (
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

export const WithExternalTooltip = {
  args: {
    showTooltip: false,
  },
  render: (args: BarChartProps<Data, BarProps<Data>>) => {
    // eslint-disable-next-line
    const [{ tooltip }, setArgs] = useArgs<typeof args & { tooltip: Data }>();

    useEffect(() => {
      if (args.data.length > 0) {
        setArgs({
          tooltip: args.data[args.data.length - 1],
        });
      }
    }, []);

    const handleChartUpdate = useCallback((state: any) => {
      if (!state) return;

      if (state.activePayload && state.activePayload.length > 0) {
        const payload = state.activePayload[0].payload as Data;
        setArgs({
          tooltip: payload,
        });
      } else if (
        state.activeTooltipIndex !== undefined &&
        state.activeTooltipIndex !== null
      ) {
        const index = Number(state.activeTooltipIndex);
        const point = args.data[index];
        if (point) {
          setArgs({
            tooltip: point,
          });
        }
      }
    }, []);

    return (
      <Stack direction="column">
        <Stack direction="row" columnGap={8} style={{ height: 100 }}>
          {tooltip && (
            <>
              <Title level="3">{tooltip.x}</Title>
              {args.series.map((item: any, index: number) => (
                <Stack key={item.dataKey} direction="row" columnGap={8} vAlign="center">
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: item.color ?? getChartDefaultColor(index),
                      borderRadius: 2,
                    }}
                  />
                  <Text>{item.dataKey}:</Text>
                  <Text weight="bold">{tooltip[item.dataKey as keyof Data]}</Text>
                </Stack>
              ))}
            </>
          )}
        </Stack>
        <BarChart
          {...args}
          handleChartUpdate={handleChartUpdate}
        />
      </Stack>
    );
  },
} satisfies Story;
