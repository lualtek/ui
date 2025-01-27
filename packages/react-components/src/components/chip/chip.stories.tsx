import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './chip';

const meta = {
  title: 'Badges/Chip',
  component: Chip,
  args: {
    dimension: 'regular',
    dismissable: false,
    interactive: false,
    children: 'chip',
  },
  argTypes: {
    onDismissClick: {
      action: 'dismissed',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: [
        'brand',
        'gray',
        'cyan',
        'green',
        'purple',
        'yellow',
        'red',
        'blue',
        'slate',
        'indigo',
        'salmon',
        'dipsy',
        'magenta',
        'primary',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithIcon = {
  args: {
    icon: 'device',
  },
} satisfies Story;

export const Dismissale = {
  args: {
    dismissable: true,
  },
} satisfies Story;

export const Interactive = {
  args: {
    interactive: true,
    onClick: (event) => console.log(event),
  },
} satisfies Story;
