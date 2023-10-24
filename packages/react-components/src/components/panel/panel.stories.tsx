import type { Meta, StoryObj } from '@storybook/react';

import { Panel } from './panel';

const meta = {
  title: 'Layouts/Panel',
  component: Panel,
  args: {
    radius: 24,
    bordered: false,
    hPadding: undefined,
    vPadding: undefined,
  },
  argTypes: {
    vibrancyLevel: {
      options: [undefined, 'soft', 'strong'],
      control: { type: 'radio' },
    },
    vibrancySaturation: {
      options: [undefined, 'standard', 'high'],
      control: { type: 'radio' },
    },
    vibrancyColor: {
      options: [undefined, 'background', 'soft', 'mid', 'hard'],
      control: { type: 'select' },
    },
    borderSide: {
      options: ['all', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
  render: args => (
    <Panel {...args}>
      Ciao
    </Panel>
  ),
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithVibrancy = {
  args: {
    vibrant: true,
    vibrancyColor: 'mid',
  },
  render: args => (
    <>
      <img
        width="100%"
        alt=""
        style={{ position: 'absolute', zIndex: -1 }}
        src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80"
      />
      <Panel {...args}>
        Ciao
      </Panel>
    </>
  ),
} satisfies Story;

export const Bordered = {
  args: {
    bordered: true,
    borderSide: 'all',
  },
} satisfies Story;

export const Dimmed = {
  args: {
    backgroundColor: 2,
  },
} satisfies Story;

export const CustomColor = {
  args: {
    backgroundColor: 'red',
  },
} satisfies Story;

export const WithHover = {
  args: {
    bordered: true,
    backgroundColor: 2,
    highlightOnHover: true,
  },
  render: args => (
    <Panel
      {...args}
      highlightOnHover
      bordered
      vPadding={24}
      hPadding={24}
    >
      Ciao
    </Panel>
  ),
} satisfies Story;

export const WithCustomHover = {
  args: {
    bordered: true,
    backgroundColor: 'gray',
    highlightOnHover: true,
  },
  render: args => (
    <Panel
      {...args}
      highlightOnHover
      bordered
      vPadding={24}
      hPadding={24}
    >
      Ciao
    </Panel>
  ),
} satisfies Story;
