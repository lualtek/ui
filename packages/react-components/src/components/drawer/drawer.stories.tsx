import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Button, OverlayContainer, Stack,
} from '../..';
import { Drawer } from './drawer';

const DrawerShell = ({ ...args }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Drawer</Button>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <OverlayContainer obfuscate={args.isModal} onClose={() => setIsVisible(false)}>
        {isVisible && (
          <Drawer {...args}>
            <Stack
              vAlign="center"
              vPadding={24}
              hPadding={24}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
              <img width="100%" alt="" height="auto" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
              <Button onClick={() => setIsVisible(false)}>Close drawer</Button>
            </Stack>
          </Drawer>
        )}
      </OverlayContainer>
    </>
  );
};

const meta = {
  title: 'Dialogs/Drawer',
  component: Drawer,
  render: args => <DrawerShell {...args} />,
  args: {
    side: 'right',
    title: 'Drawer title',
    closeOnClickOutside: true,
    isModal: true,
  },
  argTypes: {
    side: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const NonModal = {
  args: {
    closeOnClickOutside: false,
    isModal: false,
  },
} satisfies Story;
