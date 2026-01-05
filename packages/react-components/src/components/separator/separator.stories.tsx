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

import { Separator } from './separator';

const meta = {
  title: 'Layouts/Separator',
  component: Separator,
  args: {
    vertical: false,
  },
  render: args => <Separator {...args} />,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    vPadding: 32,
  },
} satisfies Story;

export const Vertical = {
  args: {
    vertical: true,
  },
  render: args => <div style={{ height: '500px' }}><Separator {...args} /></div>,
} satisfies Story;
