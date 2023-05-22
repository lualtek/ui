import type { Meta, StoryObj } from '@storybook/react';

import {
  Button, Card, IconButton,
} from '../..';
import { Popover } from './popover';

const meta = {
  title: 'Dialogs/Popover',
  component: Popover,
  render: args => (
    <Popover {...args}>
      <Popover.Trigger><Button>Click me</Button></Popover.Trigger>
      <Popover.Content>
        <Card vibrant>
          <Popover.Close>
            <IconButton icon="remove" kind="secondary" dimension="small" />
          </Popover.Close>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Distinctio aliquam exercitationem ut? Molestias repellat facilis totam non.
        </Card>
      </Popover.Content>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomAnchor = {
  render: args => (
    <Popover {...args}>
      <Popover.Anchor>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Saepe laboriosam eos quos dolore ratione corporis sunt.
          Veritatis doloribus consectetur autem, voluptatem cum tempora
          cumque molestias ipsum? Sunt voluptatibus nemo saepe.
          <Popover.Trigger><Button>Click me</Button></Popover.Trigger>
        </div>
      </Popover.Anchor>

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
  ),
} satisfies Story;
