import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './skeleton';

const meta = {
  title: 'Loading/Skeleton',
  component: Skeleton,
  args: {
    borderRadius: 8,
    gap: 8,
    enableAnimation: true,
    inline: false,
  },
  render: args => <Skeleton {...args} />,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    width: '400px',
    count: 4,
    height: '48px',
  },
} satisfies Story;

export const Circle = {
  args: {
    circle: true,
    width: '80px',
    height: '80px',
  },
} satisfies Story;

export const Rounded = {
  args: {
    width: '400px',
    height: '48px',
    borderRadius: 16,
  },
} satisfies Story;

export const WithGap = {
  args: {
    gap: 32,
    count: 4,
    height: '48px',
  },
} satisfies Story;
