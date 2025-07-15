import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, Stack } from '@/components';

import { Sheet } from './sheet';

const meta = {
  title: 'Dialogs/Sheet',
  component: Sheet,
  tags: ['!autodocs'],
  args: {
    open: false,
    dismissible: true,
    compactHeader: false,
    direction: 'bottom',
    heading: 'Sheet title',
    trigger: <Button>Open sheet</Button>,
    showCloseButton: false,
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
        trigger={args.trigger}
      >
        <Stack>
          {args.children}
          <Stack direction="row" vPadding={[16, 0]} columnGap={8} hAlign="center" fill={false} wrap>
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

export const WithZIndex = {
  args: {
    zIndex: 1000,
  },
} satisfies Story;

export const ScrollInside = {
  args: {
    direction: 'left',
    scrollInside: true,
    children: (
      <div style={{ flexGrow: 1, background: 'red', overflow: 'auto' }}>
        {Array.from(
          { length: 100 },
          () => 'This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.',
        ).join('')}
      </div>
    ),
  },
  render: function Render({ ...args }) {
    const [, setOpen] = useArgs<typeof args>();

    return (
      <>
        <Sheet
          {...args}
          onOpenChange={(open) => {
            console.log('ciao', open);
            setOpen({ open });
          }}
          trigger={args.trigger}
        >
          {args.children}
        </Sheet>
        {/* eslint-disable-next-line max-len */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, cumque? Totam reiciendis tempora illum aut, laboriosam provident molestiae doloribus in alias fugit nostrum distinctio accusantium cum repellat veritatis voluptatibus. Sunt.
      </>
    );
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

export const Side = {
  args: {
    direction: 'left',
  },
} satisfies Story;

export const NoTrigger = {
  args: {
    trigger: undefined,
    open: true,
  },
} satisfies Story;

export const NoHeading = {
  args: {
    showHeading: false,
  },
} satisfies Story;

export const ShortContent = {
  args: {
    showHeading: false,
    maxWidth: '300px',
    children: 'Ciao',
  },
} satisfies Story;

export const Nested = {
  args: {},
  render: function Render({ ...args }) {
    const [, setOpen] = useArgs<typeof args>();

    return (
      <>
        <Sheet
          {...args}
          onOpenChange={open => setOpen({ open })}
          trigger={<Button>Open sheet</Button>}
        >
          <Stack rowGap={24}>
            This is an example of nested sheet. You can click the button below to open another sheet.
            <Sheet
              nested
              heading="Nested shit title"
              direction={args.direction}
              dismissible={args.dismissible}
              trigger={<Button>Open nested sheet</Button>}
            >
              <Stack>
                Nested sheet content example
              </Stack>
            </Sheet>
          </Stack>
        </Sheet>
        {/* eslint-disable-next-line max-len */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, cumque? Totam reiciendis tempora illum aut, laboriosam provident molestiae doloribus in alias fugit nostrum distinctio accusantium cum repellat veritatis voluptatibus. Sunt.
      </>
    );
  },
} satisfies Story;
