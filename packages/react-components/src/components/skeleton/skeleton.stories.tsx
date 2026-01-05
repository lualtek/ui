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

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack, Switch, Textfield } from '@/components';

import { Skeleton } from './skeleton';

const meta = {
  title: 'Loading/Skeleton',
  component: Skeleton,
  args: {
    radius: 8,
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
    radius: 16,
  },
} satisfies Story;

export const WithGap = {
  args: {
    gap: 32,
    count: 4,
    height: '48px',
  },
} satisfies Story;

export const WithChildren = {
  args: {
    loading: true,
  },
  render: args => (
    <Stack rowGap={8} fill={false} hAlign="start">
      <Skeleton {...args}>
        <Switch />
      </Skeleton>
      <Skeleton {...args}>
        <Textfield label="Label" />
      </Skeleton>
      <Skeleton {...args}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil molestias minus labore quo officia, sit tenetur
        est qui exercitationem eaque fugiat accusamus natus dolorum possimus, optio temporibus cum numquam voluptas?
      </Skeleton>
    </Stack>
  ),
} satisfies Story;
