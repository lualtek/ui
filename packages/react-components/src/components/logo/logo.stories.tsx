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

import { Logo } from './logo';

const meta = {
  title: 'Widgets/Logo',
  component: Logo,
  args: {
    width: '300px',
    trim: true,
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
