import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta = {
  title: 'Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
