import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Chip, Text } from '../..';
import { Menu } from '..';

const story: ComponentMeta<typeof Menu.Item> = {
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
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const TemplateItem: ComponentStory<typeof Menu.Item> = args => (
  <>
    <Menu.Item
      icon="sun"
      {...args}
    >
      List item text
    </Menu.Item>
    <Menu.Item
      icon="sun"
      decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      {...args}
    >
      List item text
    </Menu.Item>
  </>
);

export const DefaultItem = TemplateItem.bind({});

const WithCheckboxTemplate: ComponentStory<typeof Menu.ItemCheckbox> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <Menu.ItemCheckbox
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked(val => !val)}
        {...args}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        icon="sun"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
        {...args}
      >
        List item text
      </Menu.Item>
    </>
  );
};

export const WithCheckboxes = WithCheckboxTemplate.bind({});

const WithDecoratorsTemplate: ComponentStory<typeof Menu.Item> = args => (
  <>
    <Menu.Item decoration={<Chip dimension="small" color="yellow">Good</Chip>} icon="sun" {...args}>List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="blue">Example</Chip>} icon="chat" {...args}>List item text List item</Menu.Item>
    <Menu.Item decoration={<Text size={14} sentiment="danger">Warning</Text>} icon="view" {...args}>List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="purple">Decoration</Chip>} icon="file" {...args}>List item text</Menu.Item>
  </>
);

export const WithDecorations = WithDecoratorsTemplate.bind({});
