import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Chip } from '../..';
import type { MenuProps } from './menu';
import { Menu } from './menu';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  args: {
    children: (
      <>
        <Menu.Item value="2" padding={false}>
          List item text
        </Menu.Item>
        <Menu.Item value="3" padding={false}>
          List item text
        </Menu.Item>
        <Menu.Item value="4" padding={false}>
          List item text List item textList item textList item textList item text
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="4" padding={false}>
          List item text
        </Menu.Item>
      </>
    ),
  },
  render: (args) => <Menu {...args} />,
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {};
export const WithScroll = {
  args: {
    maxHeight: '100px',
  },
};

export const WithIcons = {
  render: (args) => (
    <Menu {...args}>
      <Menu.Item value="1" icon="sun">
        List item text
      </Menu.Item>
      <Menu.Item value="2" icon="chat">
        List item text List item
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item value="3">List item text</Menu.Item>
      <Menu.Item value="4" icon="view">
        List item text
      </Menu.Item>
    </Menu>
  ),
} satisfies Story;

const WithCheckboxTemplate = ({ ...args }: MenuProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        value="1"
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked((val) => !val)}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        value="2"
        icon="sun"
        decoration={
          <Chip dimension="small" color="blue">
            Decoration
          </Chip>
        }
      >
        List item text
      </Menu.Item>
    </Menu>
  );
};

export const WithCheckboxes = {
  render: (args) => <WithCheckboxTemplate {...args} />,
} satisfies Story;

export const WithLinks = {
  render: (args) => (
    <Menu {...args}>
      <Menu.Item value="1" as="a" href="https://www.lualtek.io" icon="view">
        List item text
      </Menu.Item>
      <Menu.Item value="2" icon="chat">
        List item text List item
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item value="3">List item text</Menu.Item>
      <Menu.Item value="4" as="a" href="https://www.lualtek.io" icon="star">
        List item text
      </Menu.Item>
    </Menu>
  ),
} satisfies Story;
