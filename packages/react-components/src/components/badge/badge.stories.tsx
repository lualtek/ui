import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '@/components';

import { Badge } from './badge';

const meta = {
  title: 'Badges/Badge',
  component: Badge,
  args: {
    showBadge: true,
  },
  tags: ['code-only'],
  render: args => (
    <Badge {...args}>
      <IconButton
        aria-label="Enable or disable notifications"
        icon="bell"
        dimension="big"
      />
    </Badge>
  ),
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  tags: ['code-only'],
} satisfies Story;
