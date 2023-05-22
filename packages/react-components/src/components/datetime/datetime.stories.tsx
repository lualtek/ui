import type { Meta, StoryObj } from '@storybook/react';

import { Datetime } from './datetime';

const meta = {
  title: 'Widgets/Datetime',
  component: Datetime,
  argTypes: {
    locale: { type: 'string' },
  },
  args: {
    locale: 'it-IT',
    date: '2021-12-15T16:00:32.507981+00:00',
  },
} satisfies Meta<typeof Datetime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    date: '2021-12-15T16:00:32.507981+00:00',
    options: {
      year: '2-digit',
    },
  },
} satisfies Story;
