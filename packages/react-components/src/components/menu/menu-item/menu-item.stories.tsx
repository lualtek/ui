import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Chip, Text } from '../..';
import { Menu } from '..';

const story: Meta<typeof Menu.Item> = {
  title: 'Navigation/Menu/Menu Item',
  component: Menu.Item,
  args: {
    dimension: 'regular',
    padding: true,
    iconPosition: 'left',
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
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const TemplateItem: StoryFn<typeof Menu.Item> = args => (
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
);

export const DefaultItem = TemplateItem.bind({});

const WithCheckboxTemplate: StoryFn<typeof Menu.ItemCheckbox> = (args) => {
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

export const WithCheckboxes = WithCheckboxTemplate.bind({});

const WithDecoratorsTemplate: StoryFn<typeof Menu.Item> = args => (
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
);

export const WithDecorations = WithDecoratorsTemplate.bind({});
