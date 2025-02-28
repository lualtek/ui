import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, Stack } from '@/components';

import { Sheet } from './sheet';

const meta = {
  title: 'Dialogs/Sheet',
  component: Sheet,
  args: {
    open: false,
    dismissible: true,
    heading: 'Sheet title',
    trigger: <Button>Open sheet</Button>,
    description: `This component can be used as a Dialog replacement on mobile and tablet devices.
You can read about why and how it was built`,
    children:
      'This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.',
  },
  render: function Render({ ...args }) {
    const [, setOpen] = useArgs<typeof args>();

    return (
      <Sheet
        {...args}
        onOpenChange={open => setOpen({ open })}
        trigger={
          <Button>Open sheet</Button>
        }
      >
        <Stack>
          {args.children}
          <Stack direction="row" vPadding={[16, 0]} columnGap={8}>
            <Button onClick={() => setOpen({ open: false })}>Confirm</Button>
            <Button kind="flat" onClick={() => setOpen({ open: false })}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    );
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    open: false,
  },
} satisfies Story;

export const NonDismissible = {
  args: {
    open: false,
    dismissible: false,
  },
} satisfies Story;

export const NonModal = {
  args: {
    modal: false,
  },
} satisfies Story;

export const LongContent = {
  args: {
    children: Array.from(
      { length: 100 },
      () => 'This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.',
    ).join(''),
  },
} satisfies Story;

export const HeaderTint = {
  args: {
    headerTint: 'var(--dimmed-1)',
    children: Array.from(
      { length: 100 },
      () => 'This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.',
    ).join(''),
  },
} satisfies Story;
