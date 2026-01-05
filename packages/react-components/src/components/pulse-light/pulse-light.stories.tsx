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

import { IconButton } from '@/components';

import { PulseLight } from './pulse-light';

const meta = {
  title: 'Badges/Pulse Light',
  component: PulseLight,
  args: {
    color: "yellow",
    dimension: 8
  },
  tags: ['code-only'],
} satisfies Meta<typeof PulseLight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  tags: ['code-only'],
} satisfies Story;
