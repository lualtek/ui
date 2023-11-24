import type { Meta, StoryObj } from '@storybook/react';

import { IconChip } from './icon-chip';

const meta = {
  title: 'Badges/Icon Chip',
  component: IconChip,
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: [
        'brand', 'gray', 'cyan', 'green',
        'purple', 'yellow', 'red', 'blue', 'slate',
        'indigo', 'salmon', 'dipsy', 'magenta',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    color: 'cyan',
    icon: 'sensor',
  },
} satisfies Meta<typeof IconChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
