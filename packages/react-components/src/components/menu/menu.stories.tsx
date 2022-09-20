import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Chip, Separator } from '../..';
import { Menu } from './menu';

const story: ComponentMeta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
};

export default story;

const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item padding={false}>List item text</Menu.Item>
    <Menu.Item padding={false}>List item text</Menu.Item>
    <Menu.Item padding={false}>List item text List item textList item textList item textList item text</Menu.Item>
    <Separator />
    <Menu.Item padding={false}>List item text</Menu.Item>
  </Menu>
);

export const Default = Template.bind({});

const WithIconsTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item icon="sun">List item text</Menu.Item>
    <Menu.Item icon="chat">List item text List item</Menu.Item>
    <Separator />
    <Menu.Item>List item text</Menu.Item>
    <Menu.Item icon="view">List item text</Menu.Item>
  </Menu>
);

export const WithIcons = WithIconsTemplate.bind({});

const WithCheckboxTemplate: ComponentStory<typeof Menu> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked(val => !val)}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        icon="sun"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      >
        List item text
      </Menu.Item>
    </Menu>
  );
};

export const WithCheckboxes = WithCheckboxTemplate.bind({});

const LinksTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item as="a" href="https://www.lualtek.io" icon="view">List item text</Menu.Item>
    <Menu.Item icon="chat">List item text List item</Menu.Item>
    <Separator />
    <Menu.Item>List item text</Menu.Item>
    <Menu.Item as="a" href="https://www.lualtek.io" icon="star">List item text</Menu.Item>
  </Menu>
);

export const AsLink = LinksTemplate.bind({});
