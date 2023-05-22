import type { Meta, StoryObj } from '@storybook/react';

import { Button, Text } from '../..';
import { InfoState } from './info-state';

const meta = {
  title: 'Dialogs/InfoState',
  component: InfoState,
  args: {
    title: 'Sample very long title',
  },
  argTypes: {
    iconColor: {
      options: [
        'brand', 'gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue', 'indigo', 'salmon', 'dipsy', 'magenta'],
      control: { type: 'select' },
    },
  },
  render: args => (
    <InfoState {...args}>
      <Text maxWidth="40ch">
        Cras ultricies, elit sit amet cursus consectetur,
        risus felis ullamcorper nulla, ut scelerisque sapien lorem non sem.
      </Text>
    </InfoState>
  ),
} satisfies Meta<typeof InfoState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    icon: 'bell',
  },
} satisfies Story;

export const Horizontal = {
  args: {
    direction: 'row',
    icon: 'bell',
  },
} satisfies Story;

export const WithImage = {
  args: {
    image: 'https://svgshare.com/i/b5f.svg',
  },
} satisfies Story;

export const WithImageHorizontal = {
  args: {
    direction: 'row',
    image: 'https://svgshare.com/i/b5f.svg',
  },
} satisfies Story;

export const WithActions = {
  args: {
    actions: [
      <Button>Primary</Button>,
      <Button kind="flat">Secondary</Button>,
    ],
  },
} satisfies Story;
