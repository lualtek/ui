import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo } from './logo';

const meta = {
  title: 'Widgets/Logo',
  component: Logo,
  args: {
    width: '300px',
    trim: true,
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
