import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './slider';

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  args: {
    orientation: 'horizontal',
    defaultValue: [30],
    showValues: true,
  },
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <div style={{ height: 50 }}>
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithLabel = {
  args: {
    label: 'Slider',
  },
} satisfies Story;

export const Double = {
  args: {
    defaultValue: [30, 70],
  },
} satisfies Story;

export const ValueLabel = {
  args: {
    defaultValue: [6000, 9000],
    min: 5000,
    max: 10000,
    valueLabel: val => (val ? `${new Intl.NumberFormat('en-GB').format(val)}K` : ''),
  },
} satisfies Story;
