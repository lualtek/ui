import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Autocomplete,
  Button, Chip, Stack,
} from '../..';
import { Drawer } from './drawer';

const options = [
  {
    value: 'apple',
    children: '🍎 Apple',
    decoration: <Chip dimension="small" color="green">110 Cal</Chip>,
  },
  {
    value: 'banana',
    children: '🍌 Banana',
  },
  {
    value: 'cherry',
    children: '🍒 Cherry al;kj asdfjka s;ldfja dflkjlka; fsdk fsdlkkljd klasj fkasjl ',
  },
];

const DrawerShell = ({ ...args }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Drawer</Button>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Drawer isOpen={isVisible} onClose={() => setIsVisible(false)} {...args}>
        <Stack
          vAlign="center"
          hPadding={24}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
          <Autocomplete matchFieldWidth label="dio" options={options} align="center" />
          <img width="100%" alt="" height="auto" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
          <Button onClick={() => setIsVisible(false)}>Close drawer</Button>
        </Stack>
      </Drawer>
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
    safePadding: true,
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
  render: args => <DrawerShell {...args} />,
} satisfies Story;
