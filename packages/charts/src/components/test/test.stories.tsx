import type { Meta, StoryObj } from '@storybook/react';

import { Test } from './test';

const meta = {
  title: 'Charts/Linear',
  component: Test,
  args: {

  },
} satisfies Meta<typeof Test>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
