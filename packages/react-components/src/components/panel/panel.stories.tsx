import type { Meta, StoryObj } from '@storybook/react';

import { Panel } from './panel';

const meta = {
  title: 'Layouts/Panel',
  component: Panel,
  args: {
    radius: 24,
  },
  argTypes: {
    vibrancy: {
      options: [undefined, 'soft', 'strong'],
      control: { type: 'radio' },
    },
    vibrancyColor: {
      options: [undefined, 'background', 'soft', 'mid', 'hard'],
      control: { type: 'select' },
    },
    borderSide: {
      options: ['all', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
  render: args => (
    <>
      <img style={{ position: 'absolute', zIndex: -1 }} width="100%" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
      <Panel {...args}>
        Ciao
      </Panel>
    </>
  ),
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithVibrancy = {
  args: {
    vibrancy: 'soft',
    vibrancyColor: 'mid',
  },
} satisfies Story;

export const Bordered = {
  args: {
    bordered: true,
    borderSide: 'all',
  },
} satisfies Story;
