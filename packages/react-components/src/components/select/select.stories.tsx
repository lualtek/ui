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

import { Button, Stack } from '@/components';

import { Select } from './select';

const meta = {
  title: 'Inputs/Select',
  component: Select,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    kind: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <Select defaultValue="placeholder" {...args}>
      <option value="placeholder" hidden disabled>Pick an option</option>
      <optgroup label="Option Group One">
        <option value="1">This is a very long option selected</option>
        <option value="2">Option 2</option>
      </optgroup>
      <optgroup label="Option Group Two">
        <option value="3">Option 1</option>
        <option value="4">Option 2</option>
        <option value="5">Option 3</option>
      </optgroup>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single = {
  args: {
    disabled: false,
    kind: 'single',
    label: 'Label',
  },
} satisfies Story;

export const Required = {
  args: {
    disabled: false,
    kind: 'single',
    label: 'Label',
    required: true,
  },
  render: args => (
    <Stack as="form">
      <Select {...args} />
      <Button type="submit">Submit</Button>
    </Stack>
  ),
} satisfies Story;

export const ForcedInvalid = {
  args: {
    disabled: false,
    kind: 'single',
    label: 'Label',
    invalid: true,
  },
} satisfies Story;

export const Multiple = {
  args: {
    label: 'Label',
    kind: 'multiple',
  },
  render: args => (
    <Select {...args} kind="multiple">
      <optgroup label="Option Group">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </optgroup>
      <optgroup label="Option Group 2">
        <option>Option 4</option>
        <option>Option 5</option>
        <option>Option 6</option>
      </optgroup>
    </Select>
  ),
} satisfies Story;
