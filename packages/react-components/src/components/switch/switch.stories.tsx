import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './switch';

const meta = {
  title: 'Inputs/Switch',
  component: Switch,
  args: {
    disabled: false,
    dimension: 'regular',
  },
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
  render: args => <Switch {...args} />,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const DisabledChecked = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
} satisfies Story;

export const WithLabel = {
  args: {
    label: 'Sample label',
  },
} satisfies Story;
