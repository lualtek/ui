import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, Stack } from '../..';
import { OverlayContainer } from './overlay-container';

const Template = ({ ...args }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Overlay</Button>
      <OverlayContainer onClose={() => setVisible(false)} {...args}>
        {isVisible && args.children}
      </OverlayContainer>
    </>
  );
};

const meta = {
  title: 'Layouts/Overlay container',
  component: OverlayContainer,
  args: {
    obfuscate: true,
    children: (
      <Stack
        fill={false}
        hAlign="center"
        vAlign="center"
      >
        I am over the top
      </Stack>
    ),
  },
  render: args => <Template {...args} />,
} satisfies Meta<typeof OverlayContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
