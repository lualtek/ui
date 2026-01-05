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

import { ToggleButton } from './toggle-button';

const meta = {
  title: 'Actions/Toggle button',
  component: ToggleButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    restingIcon: 'view',
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
  render: args => <ToggleButton {...args} />,
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const MultipleIcons = {
  args: {
    pressedIcon: 'hide',
  },
} satisfies Story;
