import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from './stack';

const meta = {
  title: 'Layouts/Stack',
  component: Stack,
  argTypes: {
    inline: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    wrap: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    fill: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    direction: {
      options: ['row', 'column'],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    direction: 'row',
    wrap: true,
  },
  render: args => (
    <Stack rowGap={80} columnGap={24} {...args}>
      <div className="DivEx">01</div>
      <div className="DivEx">02</div>
      <div className="DivEx">03</div>
      <div className="DivEx">04</div>
      <div className="DivEx">05</div>
      <div className="DivEx">06</div>
      <div className="DivEx">07</div>
      <div className="DivEx">08</div>
      <div className="DivEx">09</div>
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    hAlign: 'start',
    vAlign: 'start',
  },
} satisfies Story;

export const WithPaddings = {
  args: {
    vPadding: [8, 88],
    hPadding: 24,
  },
} satisfies Story;

export const WithMaxWidth = {
  args: {
    maxWidth: '800px',
    style: { backgroundColor: 'lightblue' },
  },
} satisfies Story;

export const WidthGrowChild = {
  args: {},
  render: args => (
    <Stack rowGap={80} columnGap={24} {...args}>
      <div style={{ background: 'slategray', padding: 8 }} data-grow={false}>01</div>
      <div style={{ background: 'slategray', padding: 8 }}>02</div>
    </Stack>
  ),
} satisfies Story;
