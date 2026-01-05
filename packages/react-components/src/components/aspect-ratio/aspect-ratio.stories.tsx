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

import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Layouts/Aspect Ratio',
  component: AspectRatio,
  args: {
    children: <div style={{ background: 'var(--dimmed-2)' }}>16/4</div>,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ratio: '16/4',
  },
} satisfies Story;
