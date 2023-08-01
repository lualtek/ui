import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../..';
import { Elevator } from './elevator';

const meta = {
  title: 'Widgets/Elevator',
  component: Elevator,
  render: args => (
    <Elevator {...args}>
      <Card bordered>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.
      </Card>
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
