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

import { IconChip } from './icon-chip';

const meta = {
  title: 'Badges/Icon Chip',
  component: IconChip,
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: [
        'brand', 'gray', 'cyan', 'green',
        'purple', 'yellow', 'red', 'blue', 'slate',
        'indigo', 'salmon', 'dipsy', 'magenta', 'primary',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    color: 'cyan',
    icon: 'sensor',
  },
} satisfies Meta<typeof IconChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
