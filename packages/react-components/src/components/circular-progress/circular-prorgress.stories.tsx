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

import { CircularProgress } from './circular-progress';

const meta = {
  title: 'Loading/Circular progress',
  component: CircularProgress,
  args: {
    max: 100,
    value: 75,
    dimension: 'regular',
    showProgress: true,
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Determinate = {
  args: {
    value: 75,
  },
} satisfies Story;

export const WithCustomLabel = {
  args: {
    progressLabel: val => `${val}%`,
  },
} satisfies Story;
