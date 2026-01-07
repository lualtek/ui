import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Layouts/Aspect Ratio',
  component: AspectRatio,
  args: {
    children: <div style={{ background: 'var(--dimmed-2)' }}>16/4</div>,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ratio: '16/4',
  },
} satisfies Story;
