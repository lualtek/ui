import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './avatar';

const meta = {
  title: 'Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'big',
    src: 'https://mighty.tools/mockmind-api/content/human/72.jpg',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const NoImage = {
  args: {
    src: '',
  },
} satisfies Story;
