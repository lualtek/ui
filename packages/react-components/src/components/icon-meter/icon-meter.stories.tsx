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

import { IconMeter } from './icon-meter';

const meta = {
  title: 'Widgets/Icon meter',
  component: IconMeter,
  args: {
    dimension: 'regular',
    icon: 'circle',
    value: 3.5,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: args => <IconMeter {...args} />,
} satisfies Meta<typeof IconMeter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomLabel = {
  args: {
    label: 'Hello there 👋',
  },
} satisfies Story;
