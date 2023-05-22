import type { Meta, StoryObj } from '@storybook/react';

import { TextChip } from './text-chip';

const meta = {
  title: 'Badges/Text Chip',
  component: TextChip,
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: [
        'brand', 'gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue', 'indigo', 'salmon', 'dipsy', 'magenta'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    tinted: true,
    color: 'cyan',
  },
  render: args => <TextChip {...args} />,
} satisfies Meta<typeof TextChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    text: '1.11',
  },
} satisfies Story;

export const WithEmoji = {
  args: {
    text: '🥲',
  },
} satisfies Story;
