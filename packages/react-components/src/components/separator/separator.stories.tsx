import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta = {
  title: 'Layouts/Separator',
  component: Separator,
  render: args => <Separator {...args} />,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    vPadding: 32,
  },
} satisfies Story;
