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

import { Textarea as Area } from './textarea';

const meta = {
  title: 'Inputs/Textarea',
  component: Area,
  args: {
    readOnly: false,
    label: 'Textarea',
  },
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    readOnly: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    invalid: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
  render: args => <Area {...args} placeholder="Placeholder" />,
} satisfies Meta<typeof Area>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Textarea = {
  args: {
    rows: 10,
  },
} satisfies Story;

export const Invalid = {
  args: {
    rows: 10,
    required: true,
    hint: {
      resting: 'Resting hint',
      invalid: 'Invalid hint',
    },
  },
} satisfies Story;

export const ForcedInvalid = {
  args: {
    invalid: true,
    hint: {
      invalid: 'Invalid hint',
    },
  },
} satisfies Story;
