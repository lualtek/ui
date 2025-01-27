import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, Stack } from '../..';
import { Overlay } from './overlay';

const Template = ({ ...args }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Overlay</Button>
      <Overlay onClose={() => setVisible(false)} {...args}>
        {isVisible && args.children}
      </Overlay>
    </>
  );
};

const meta = {
  title: 'Layouts/Overlay',
  component: Overlay,
  args: {
    obfuscate: true,
    children: (
      <Stack fill={false} hAlign="center" vAlign="center">
        I am over the top
      </Stack>
    ),
  },
  render: (args) => <Template {...args} />,
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
