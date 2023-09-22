import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Layouts/Aspect Ratio',
  component: AspectRatio,
  render: args => (
    <AspectRatio {...args}>
      <div style={{ background: 'var(--dimmed-2)' }}>16/4</div>
    </AspectRatio>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ratio: '16/4',
  },
} satisfies Story;
