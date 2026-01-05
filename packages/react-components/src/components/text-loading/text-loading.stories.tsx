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

import { TextLoading } from './text-loading';

const meta: Meta<typeof TextLoading> = {
  title: 'Loading/Text Loading',
  component: TextLoading,
  args: {
    char: '…'
  },
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithCustomChar = {
  args: {
    char: '．',
  }
} satisfies Story;

export const WithEmoji = {
  args: {
    char: '🚀',
  }
} satisfies Story;


