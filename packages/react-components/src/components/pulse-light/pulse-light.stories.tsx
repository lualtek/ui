import type { Meta, StoryObj } from '@storybook/react-vite';

import { PulseLight } from './pulse-light';

const meta = {
  title: 'Badges/Pulse Light',
  component: PulseLight,
  args: {
    color: 'yellow',
    dimension: 8,
  },
  tags: ['code-only'],
} satisfies Meta<typeof PulseLight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  tags: ['code-only'],
} satisfies Story;
