import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '../..';
import { IconMeter } from './icon-meter';

const meta = {
  title: 'Widgets/Icon meter',
  component: IconMeter,
  args: {
    dimension: 'regular',
    value: 3.5,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: args => <Stack><IconMeter {...args} /></Stack>,
} satisfies Meta<typeof IconMeter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomLabel = {
  args: {
    label: 'Hello there 👋',
  },
} satisfies Story;
