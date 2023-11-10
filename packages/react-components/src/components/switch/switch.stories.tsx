import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/components';

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

export const WithDynamicLabel = {
  args: {
    label: 'Sample default label',
    checkedLabel: 'Checked label',
  },
  render: args => (
    <Stack direction="row" columnGap={8}>
      <Switch {...args} />
      <Switch label="Sample default label" />
    </Stack>
  ),
} satisfies Story;
