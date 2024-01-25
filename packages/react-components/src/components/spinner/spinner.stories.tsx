import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner';

const meta = {
  title: 'Loading/Spinner',
  component: Spinner,
  args: {
    dimension: 'big',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: args => <Spinner {...args} data-chromatic="ignore" />,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    dimension: 'small',
  },
} satisfies Story;
export const Regular = {
  args: {
    dimension: 'regular',
  },
} satisfies Story;
export const Big = {
  args: {
    dimension: 'big',
  },
} satisfies Story;
