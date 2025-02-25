import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import {
  Button, Stack, Text,
} from '@/components';

import { Sheet } from './sheet';

const meta = {
  title: 'Dialogs/Sheet',
  component: Sheet,
  args: {
    dismissible: true,
    heading: 'Sheet title',
    trigger: <Button>Open sheet</Button>,
    description: `This component can be used as a Dialog replacement on mobile and tablet devices.
You can read about why and how it was built`,
    children: (
      <Text>
        This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.
      </Text>
    ),
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const NonDismissible = {
  args: {
    open: true,
  },
  render: function Render({ ...args }) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [{ open }, setOpen] = useArgs<typeof args>();

    useEffect(() => {
      console.log('openEffect', open);
    }, [open]);

    return (
      <Sheet
        {...args}
      >
        <Stack hAlign="center">
          <Text>
            For cases when your drawer has to be always visible.
            Nothing will close it unless you make it controlled and close it programmatically.
          </Text>
          <Button onClick={() => setOpen({ open: false })}>
            Close sheet
          </Button>
        </Stack>
      </Sheet>
    );
  },
} satisfies Story;

export const NonModal = {
  args: {
    modal: false,
  },
} satisfies Story;
