/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack, Text } from '@/components';

import { Disclosure } from './disclosure';

const meta = {
  title: 'Actions/Disclosure',
  component: Disclosure,
  render: args => (
    <Disclosure {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
      sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
    </Disclosure>
  ),
  args: {
    padding: true,
    expandable: true,
    dimension: 'regular',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    open: false,
    iconPosition: 'start',
  },
  argTypes: {
    expandable: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Open = {
  args: {
    open: true,
    onToggle: open => console.log(open),
  },
} satisfies Story;

export const Nested = {
  render: args => (
    <Disclosure {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
      sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!

      <Disclosure summary="Nested">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>
    </Disclosure>
  ),
} satisfies Story;

export const CustomIcons = {
  args: {
    closedIcon: 'remove',
    openIcon: 'check',
  },
} satisfies Story;

export const Accordion = {
  args: {
    name: 'accordion',
  },
  render: args => (
    <Stack fill={false} rowGap={8} hAlign="start">
      <Disclosure {...args}>
        <Text dimmed={5} weight="regular">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
          sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
        </Text>
      </Disclosure>
      <Disclosure {...args}>
        <Text dimmed={5} weight="regular">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus corporis nobis ipsum natus laudantium dolorem sapiente.
        </Text>
      </Disclosure>
      <Disclosure {...args}>
        <Text dimmed={5} weight="regular">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
          sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
        </Text>
      </Disclosure>
    </Stack>
  ),
} satisfies Story;
