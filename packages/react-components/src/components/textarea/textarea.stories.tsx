import type { Meta, StoryObj } from '@storybook/react';

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
  render: args => <Area {...args} required placeholder="Placeholder" />,
} satisfies Meta<typeof Area>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Textarea = {
  args: {
    rows: 10,
  },
} satisfies Story;

export const WithLabel = {
  args: {
    label: 'Sample label',
  },
} satisfies Story;
