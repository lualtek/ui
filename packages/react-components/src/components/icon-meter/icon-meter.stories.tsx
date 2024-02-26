import type { Meta, StoryObj } from '@storybook/react';

import { IconMeter } from './icon-meter';

const meta = {
  title: 'Widgets/Icon meter',
  component: IconMeter,
  args: {
    dimension: 'regular',
    icon: 'circle',
    value: 3.5,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: args => <IconMeter {...args} />,
} satisfies Meta<typeof IconMeter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomLabel = {
  args: {
    label: 'Hello there 👋',
  },
} satisfies Story;
