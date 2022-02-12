import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, IconButton, Stack } from '../..';
import { Popover } from './popover';

const story: ComponentMeta<typeof Popover> = {
  title: 'Components/Dialogs/Popover',
  component: Popover,
  args: {
    trigger: <Button>Click me</Button>,
  },
};

export default story;

const Template: ComponentStory<typeof Popover> = args => (
  <Stack horizontalAlign="center">
    <Popover {...args}>
      <Popover.Content>
        <div
          data-elevation="2"
          style={{
            padding: 24, background: 'var(--dimmed-2)', width: 300, borderRadius: 16,
          }}
        >
          <Popover.Close>
            <IconButton icon="remove" kind="secondary" dimension="small" />
          </Popover.Close>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Distinctio aliquam exercitationem ut? Molestias repellat facilis totam non.
        </div>
      </Popover.Content>
    </Popover>
  </Stack>
);

export const Default = Template.bind({});
