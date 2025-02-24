import type { Meta, StoryObj } from '@storybook/react';

import { Button, ResponsiveProvider } from '@/components';

import { Sheet } from './sheet';

const meta = {
  title: 'Dialogs/Sheet',
  component: Sheet,
  args: {
    trigger: <Button>Open sheet</Button>,
  },
  render: function Render({ ...args }) {
    return (
      <ResponsiveProvider>
        <Sheet {...args}>
          ciao
        </Sheet>
      </ResponsiveProvider>
    );
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    trigger: <Button>Open sheet</Button>,
  },
} satisfies Story;
