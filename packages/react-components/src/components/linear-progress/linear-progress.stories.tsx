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

import { LinearProgress } from './linear-progress';

const meta = {
  title: 'Loading/Linear progress',
  component: LinearProgress,
  args: {
    max: 100,
    showProgress: true,
    dimension: 'regular',
  },
  argTypes: {
    value: {
      control: { type: 'range' },
    },
    dimension: {
      options: ['regular', 'big'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Determinate = {
  args: {
    value: 40,
  },
} satisfies Story;

export const Indeterminate = {} satisfies Story;
