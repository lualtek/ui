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
