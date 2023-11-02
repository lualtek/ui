import type { Meta, StoryObj } from '@storybook/react';

import { Marquee } from './marquee';

const meta = {
  title: 'Widgets/Marquee',
  component: Marquee,
  args: {
    gap: 8,
  },
  render: args => (
    <Marquee {...args}>
      <img width="600" height="400" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
      <img width="600" height="400" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
    </Marquee>
  ),
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
