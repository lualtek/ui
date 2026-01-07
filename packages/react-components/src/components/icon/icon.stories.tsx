import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './icon';

const meta = {
  title: 'Widgets/Icon',
  component: Icon,
  args: {
    dimension: 24,
    fill: 'currentcolor',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    source: 'chat',
  },
} satisfies Story;

export const CustomIcon = {
  args: {
    source: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        viewBox="0 0 256 256"
      >
        {/* eslint-disable-next-line max-len */}
        <path d="M128 16a96.2 96.2 0 0 0-96 96c0 24 12.6 55.1 33.6 83s44.5 45 62.4 45 41.2-16.8 62.4-45 33.6-59 33.6-83a96.2 96.2 0 0 0-96-96ZM64 116v-4a12 12 0 0 1 12-12 36 36 0 0 1 36 36v4a12 12 0 0 1-12 12 36 36 0 0 1-36-36Zm80 84h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16Zm48-84a36 36 0 0 1-36 36 12 12 0 0 1-12-12v-4a36 36 0 0 1 36-36 12 12 0 0 1 12 12Z" />
      </svg>
    ),
  },
};
