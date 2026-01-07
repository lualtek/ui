import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Chip, Text } from '../..';
import { Menu, MenuItemCheckboxProps } from '..';

const meta = {
  title: 'Navigation/Menu/Menu Item',
  component: Menu.Item,
  args: {
    dimension: 'regular',
    padding: true,
    iconPosition: 'start',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'radio' },
    },
    sentiment: {
      options: [undefined, 'positive', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['start', 'end'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <>
      <Menu.Item
        {...args}
        value="1"
        icon="sun"
      >
        List item text
      </Menu.Item>
      <Menu.Item
        {...args}
        icon="sun"
        value="2"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      >
        List item text
      </Menu.Item>
    </>
  ),
} satisfies Meta<typeof Menu.Item>;

export default meta;

type Story = StoryObj<typeof meta>;

const WithCheckboxTemplate = (args: MenuItemCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <Menu.ItemCheckbox
        {...args}
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked(val => !val)}
        value="1"
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        {...args}
        icon="sun"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
        value="2"
      >
        List item text
      </Menu.Item>
    </>
  );
};

export const WithCheckboxes = {
  args: {
    value: '1',
  },
  render: args => <WithCheckboxTemplate {...args} />,
} satisfies Story;

export const WithDecorations = {
  args: {
    value: '1',
  },
  render: args => (
    <>
      <Menu.Item
        {...args}
        value="1"
        decoration={
          <Chip dimension="small" color="yellow">Good</Chip>}
        icon="sun"
      >
        List item text
      </Menu.Item>
      <Menu.Item
        {...args}
        value="2"
        decoration={
          <Chip dimension="small" color="blue">Example</Chip>}
        icon="chat"
      >
        List item text List item
      </Menu.Item>
      <Menu.Item
        {...args}
        value="3"
        decoration={
          <Text size={14} sentiment="danger">Warning</Text>}
        icon="view"
      >
        List item text
      </Menu.Item>
      <Menu.Item
        {...args}
        value="4"
        decoration={
          <Chip dimension="small" color="purple">Decoration</Chip>}
        icon="file"
      >
        List item text
      </Menu.Item>
    </>
  ),
} satisfies Story;
