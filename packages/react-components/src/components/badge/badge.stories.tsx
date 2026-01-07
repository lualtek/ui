import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from '@/components';

import { Badge } from './badge';

const meta = {
  title: 'Badges/Badge',
  component: Badge,
  args: {
    showBadge: true,
    children: <IconButton
      aria-label="Enable or disable notifications"
      icon="bell"
      dimension="big"
    />,
  },
  tags: ['code-only'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  tags: ['code-only'],
} satisfies Story;
