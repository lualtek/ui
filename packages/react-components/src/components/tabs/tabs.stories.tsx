import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, Chip } from '../..';
import { Tabs } from './tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  args: {
    defaultValue: '1',
    dimension: 'regular',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Panel value="1" label="Tab 1">
        Panel 1
      </Tabs.Panel>
      <Tabs.Panel value="2" label="Tab mid long 2">
        Panel 2
      </Tabs.Panel>
      <Tabs.Panel value="3" label="Tab short 3">
        Panel 3
      </Tabs.Panel>
      <Tabs.Panel value="4" label="Tab veryy long 4">
        Panel 4
      </Tabs.Panel>
      <Tabs.Panel value="5" label="Tab 5">
        Panel 5
      </Tabs.Panel>
      <Tabs.Panel value="6" label="Tab 6">
        Panel 6
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const InitialTab = {
  args: {
    defaultValue: '3',
  },
} satisfies Story;

export const WithDecorator = {
  render: ({ ...args }) => (
    <>
      <Tabs {...args}>
        <Tabs.Panel value="1" label="Tab 1">
          Panel 1
        </Tabs.Panel>
        <Tabs.Panel value="2" label="Tab mid long 2" decorator={<Chip color="green">10</Chip>}>
          Panel 2
        </Tabs.Panel>
        <Tabs.Panel value="3" label="Tab short 3">
          Panel 3
        </Tabs.Panel>
        <Tabs.Panel
          value="4"
          label="Tab veryy long 4"
          decorator={
            <Chip dimension="small" color="cyan">
              8
            </Chip>
          }
        >
          Panel 4
        </Tabs.Panel>
        <Tabs.Panel value="5" label="Tab 5">
          Panel 5
        </Tabs.Panel>
        <Tabs.Panel value="6" label="Tab 6">
          Panel 6
        </Tabs.Panel>
      </Tabs>
    </>
  ),
};

const ConditionalTabTemplate = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Tabs defaultValue="1">
      <Tabs.Panel value="1" label="Tab 1">
        Tab panel 1
      </Tabs.Panel>
      <Tabs.Panel value="2" label="Tab 2">
        <Button icon="sun" onClick={() => setIsVisible(!isVisible)}>
          Toggle new tab
        </Button>
      </Tabs.Panel>
      {isVisible && (
        <Tabs.Panel value="3" label="Tab 3">
          Tab panel 3
        </Tabs.Panel>
      )}
    </Tabs>
  );
};

export const ConditionalTab: Story = {
  render: (args) => <ConditionalTabTemplate {...args} />,
} satisfies Story;

export const DisabledTabs: Story = {
  render: (args) => (
    <Tabs defaultValue="1" {...args}>
      <Tabs.Panel value="1" label="Tab 1">
        Panel 1
      </Tabs.Panel>
      <Tabs.Panel value="2" label="Tab mid long 2">
        Panel 2
      </Tabs.Panel>
      <Tabs.Panel value="3" label="Tab short 3">
        Panel 3
      </Tabs.Panel>
      <Tabs.Panel disabled value="4" label="Tab veryy long 4">
        Panel 4
      </Tabs.Panel>
      <Tabs.Panel value="5" label="Tab 5">
        Panel 5
      </Tabs.Panel>
      <Tabs.Panel value="6" label="Tab 6">
        Panel 6
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Story;

export const WithIcons: Story = {
  render: (args) => (
    <Tabs defaultValue="1" {...args}>
      <Tabs.Panel icon="star" value="1" label="Tab 1">
        Panel 1
      </Tabs.Panel>
      <Tabs.Panel icon="view" value="2" label="Tab mid long 2">
        Panel 2
      </Tabs.Panel>
      <Tabs.Panel icon="sun" value="3" label="Tab short 3">
        Panel 3
      </Tabs.Panel>
      <Tabs.Panel icon="moon-stars" disabled value="4" label="Tab veryy long 4">
        Panel 4
      </Tabs.Panel>
      <Tabs.Panel icon="zoom" value="5" label="Tab 5">
        Panel 5
      </Tabs.Panel>
      <Tabs.Panel icon="check" value="6" label="Tab 6">
        Panel 6
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Story;
