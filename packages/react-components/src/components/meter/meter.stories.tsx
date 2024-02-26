import type { Meta, StoryObj } from '@storybook/react';

import { Meter } from './meter';

const meta = {
  title: 'Widgets/Meter',
  component: Meter,
  args: {
    value: 2,
    low: 3,
    high: 5,
    optimum: 6,
    dimension: 'regular',
  },
  argTypes: {
    value: {
      control: {
        type: 'range', min: 0, max: 6, step: 0.1,
      },
    },
    low: {
      control: {
        type: 'range', min: 0, max: 6,
      },
    },
    high: {
      control: {
        type: 'range', min: 0, max: 6,
      },
    },
    optimum: {
      control: {
        type: 'range', min: 0, max: 6,
      },
    },
    dimension: { options: ['small', 'regular'], control: { type: 'inline-radio' } },
  },
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
