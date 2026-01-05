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

import { IconButton } from './icon-button';

const meta: Meta<typeof IconButton> = {
  title: 'Actions/Icon Button',
  component: IconButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    icon: 'chat',
    busy: false,
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    sentiment: {
      options: [undefined, 'positive', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    busy: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithIconOpticalSize = {
  args: {
    iconOpticalSize: {
      regular: 12,
    },
  },
} satisfies Story;

