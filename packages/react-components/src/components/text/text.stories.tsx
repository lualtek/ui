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

import { Stack } from '@/components';

import { Text } from './text';

const meta = {
  title: 'Typography/Text',
  component: Text,
  args: {
    maxWidth: '40ch',
    children: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
    tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
    consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!`,
    align: 'start',
    responsive: true,
    lineHeight: 'small',
    textColor: '',
  },
  argTypes: {
    size: {
      options: [undefined, '12', '14', '16', '18', '22', '24', '28', '32', '42', '56', '75', '100'],
      control: { type: 'select' },
    },
    sentiment: {
      options: ['positive', 'informative', 'danger', 'warning'],
      control: { type: 'select' },
    },
    dimmed: {
      options: [4, 5, 6, 7, 8],
      control: { type: 'select' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    lineHeight: {
      options: ['none', 'extra-small', 'small', 'standard', 'large'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => <Text {...args} />,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Weight = {
  args: {
    weight: 'bold',
  },
} satisfies Story;

export const WithPadding = {
  args: {
    hPadding: 104,
    vPadding: [80, 32],
  },
  render: args => <Text {...args} as="p" />,
} satisfies Story;

export const CustomWrapper = {
  args: {
    // Storybook merda a causa del typeof su Meta
    as: Stack as unknown as 'span',
  },
} satisfies Story;

export const Nested = {
  args: {
    size: 22,
  },
  render: args => (
    <Text {...args}>
      Lorem, ipsum dolor sit
      {' '}
      <Text size={14}>amet consectetur adipisicing elit.</Text>
    </Text>
  ),
} satisfies Story;

export const Balanced = {
  args: {
    balanced: true,
  },
  render: ({ as, ...args }) => (
    <Text {...args} as="p">
      {args.children}
    </Text>
  ),
} satisfies Story;
