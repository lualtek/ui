import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Chip } from '../..';
import { Menu } from './menu';

const story: ComponentMeta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
};

export default story;

const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item value="2" padding={false}>List item text</Menu.Item>
    <Menu.Item value="3" padding={false}>List item text</Menu.Item>
    <Menu.Item
      value="4"
      padding={false}
    >
      List item text List item textList item textList item textList item text
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item value="4" padding={false}>List item text</Menu.Item>
  </Menu>
);

export const Default = Template.bind({});

const WithIconsTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item value="1" icon="sun">List item text</Menu.Item>
    <Menu.Item value="2" icon="chat">List item text List item</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" icon="view">List item text</Menu.Item>
  </Menu>
);

export const WithIcons = WithIconsTemplate.bind({});

const WithCheckboxTemplate: ComponentStory<typeof Menu> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        value="1"
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked(val => !val)}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        value="2"
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
    <Menu.Item value="1" as="a" href="https://www.lualtek.io" icon="view">List item text</Menu.Item>
    <Menu.Item value="2" icon="chat">List item text List item</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" as="a" href="https://www.lualtek.io" icon="star">List item text</Menu.Item>
  </Menu>
);

export const AsLink = LinksTemplate.bind({});
