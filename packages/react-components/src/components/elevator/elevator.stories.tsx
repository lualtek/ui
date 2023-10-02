import type { Meta, StoryObj } from '@storybook/react';

import { Panel, Stack } from '../..';
import { Elevator } from './elevator';

const meta = {
  title: 'Widgets/Elevator',
  component: Elevator,
  render: args => (
    <Elevator {...args}>
      <Panel bordered radius={16} vibrant vibrancyColor="soft">
        <Stack hPadding={16} vPadding={16}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.
        </Stack>
      </Panel>
    </Elevator>
  ),
  argTypes: {
    resting: {
      options: ['0', '1', '2', '3', '4'],
      control: { type: 'select' },
    },
    hover: {
      options: ['0', '1', '2', '3', '4'],
      control: { type: 'select' },
    },
    direction: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Elevator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    resting: 1,
  },
} satisfies Story;

export const WithHover = {
  args: {
    resting: 1,
    hover: 3,
  },
} satisfies Story;

export const WithExtraShadow = {
  args: {
    resting: 1,
    extraShadow: '0 0 0 10px red',
  },
} satisfies Story;
