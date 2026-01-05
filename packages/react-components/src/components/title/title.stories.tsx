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

import { Stack } from '..';
import { Title } from './title';

const meta = {
  title: 'Typography/Title',
  component: Title,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    responsive: true,
    align: 'center',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
  },
  argTypes: {
    level: {
      options: ['display', '1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
    },
    lineHeight: {
      options: ['none', 'extra-small', 'small', 'standard', 'large'],
      control: { type: 'inline-radio' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <Title {...args}>Sample title</Title>
  ),
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    as: 'span',
    lineHeight: 'small',
    level: '1',
    maxWidth: 'auto',
    align: 'center',
  },
} satisfies Story;

export const WithPadding = {
  args: {
    level: '3',
    hPadding: 104,
    vPadding: [80, 32],
  },
  render: args => <Title {...args} as="h3" />,
} satisfies Story;

export const Scale = {
  args: {},
  render: () => (
    <Stack rowGap={32}>
      <Title level="display">Display Title</Title>
      <Title level="1">H1 Heading Title</Title>
      <Title level="2">H2 Heading Title</Title>
      <Title level="3">H3 Heading Title</Title>
      <Title level="4">H4 Heading Title</Title>
      <Title level="5">H5 Heading Title</Title>
      <Title level="6">H6 Heading Title</Title>
    </Stack>
  ),
} satisfies Story;

export const Balanced = {
  args: {
    balanced: true,
    level: '5',
  },
  render: args => (
    <Title {...args} as="h2" />
  ),
} satisfies Story;
