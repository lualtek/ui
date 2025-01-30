import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stack, SwitchProps } from '@/components';

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

const ControlledSwitch = ({ checked, ...args }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <Switch
      {...args}
      checked={isChecked}
      onCheckedChange={setIsChecked}
    />
  );
};

export const Controlled = {
  args: {
    label: 'Sample label',
    checked: true,
  },
  render: args => <ControlledSwitch {...args} />,
} satisfies Story;

export const WithDynamicLabel = {
  args: {
    label: 'Sample default label',
    checkedLabel: 'Checked label',
    onCheckedChange: checked => console.log('checked:', checked),
  },
  render: args => (
    <Stack direction="row" columnGap={8}>
      <Switch defaultChecked {...args} />
      <Switch label="Sample default label" />
    </Stack>
  ),
} satisfies Story;

