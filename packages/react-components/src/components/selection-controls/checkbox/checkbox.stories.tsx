import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../..';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    dimension: 'regular',
  },
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
  render: (args) => <Checkbox {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Checked = {
  args: {
    defaultChecked: true,
  },
} satisfies Story;

export const DisabledChecked = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
} satisfies Story;

export const Indeterminate = {
  args: {
    indeterminate: true,
  },
} satisfies Story;

export const WithLabel = {
  args: {
    label: `
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Etblanditiis dolore natus itaque
      fugiat eos harum ea veritatis consequatur deserunt, maxime similique unde ad veniam quas
      tempore, laboriosam accusamus nihil.`,
  },
} satisfies Story;

export const WithCustomLabel = {
  args: {
    label: <Chip color="green">Rich label</Chip>,
  },
} satisfies Story;

export const Required = {
  args: {
    required: true,
    label: 'Required',
  },
} satisfies Story;

export const ForcedInvalid = {
  args: {
    invalid: true,
    label: 'Required',
  },
} satisfies Story;
