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

import { Container } from './container';

const meta = {
  title: 'Layouts/Container',
  component: Container,
  render: args => (
    <Container {...args}>
      Content
    </Container>
  ),
  args: {
    className: 'ContainerEx',
  },
  argTypes: {
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    className: {
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['full', 'medium', 'large', 'extra-large'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    dimension: 'small',
  },
} satisfies Story;

export const Medium = {
  args: {
    dimension: 'medium',
  },
} satisfies Story;

export const Large = {
  args: {
    dimension: 'large',
  },
} satisfies Story;

export const ExtraLarge = {
  args: {
    dimension: 'extra-large',
  },
} satisfies Story;

export const FullWidth = {} satisfies Story;

export const NoPadding = {
  args: {
    padding: false,
  },
} satisfies Story;
