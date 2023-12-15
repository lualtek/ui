import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/components';

import { GlowPanel } from './glow-panel';

const meta = {
  title: 'Widgets/Glow Panel',
  component: GlowPanel,
  args: {
    bordered: true,
    radius: 24,
    vibrant: true,
    vibrancyColor: 'mid',
    proximity: 170,
    spread: 80,
    blur: 50,
    opacity: 0,
    borderWidth: 2,
    borderColor: 'var(--vibrancy-background-hard)',
    glowSize: 10,
    glowOffset: -5,
  },
  argTypes: {
    blur: {
      control: {
        type: 'range', min: 0, max: 50, step: 1,
      },
    },
    glowSize: {
      control: {
        type: 'range', min: 1, max: 10, step: 1,
      },
    },
    glowOffset: {
      control: {
        type: 'range', min: -10, max: 10, step: 1,
      },
    },
    borderWidth: {
      control: {
        type: 'range', min: 1, max: 10, step: 1,
      },
    },
  },
  render: args => (
    <Stack direction="row" fill={false} columnGap={32}>
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
    </Stack>
  ),
} satisfies Meta<typeof GlowPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
