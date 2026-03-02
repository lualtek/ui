import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextLoading } from './text-loading';

const meta: Meta<typeof TextLoading> = {
  title: 'Loading/Text Loading',
  component: TextLoading,
  args: {
    char: '…',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithCustomChar = {
  args: {
    char: '．',
  },
} satisfies Story;

export const WithEmoji = {
  args: {
    char: '🚀',
  },
} satisfies Story;
