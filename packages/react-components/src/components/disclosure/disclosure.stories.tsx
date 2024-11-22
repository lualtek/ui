import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/components';

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

export const Accordion = {
  args: {
    name: 'accordion',
  },
  render: args => (
    <Stack fill={false} rowGap={8} hAlign="start">
      <Disclosure {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>
      <Disclosure {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>
    </Stack>
  ),
} satisfies Story;
