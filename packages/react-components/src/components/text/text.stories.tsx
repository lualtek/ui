import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta = {
  title: 'Typography/Text',
  component: Text,
  args: {
    maxWidth: '40ch',
    children: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
    tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
    consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!`,
    textAlign: 'start',
    responsive: true,
    lineHeight: 'small',
    textColor: '',
  },
  argTypes: {
    size: {
      options: ['12', '14', '16', '18', '22', '24', '28', '32', '42', '56', '75', '100'],
      control: { type: 'select' },
    },
    sentiment: {
      options: ['positive', 'informative', 'danger', 'warning'],
      control: { type: 'select' },
    },
    dimmed: {
      options: [4, 5, 6, 7, 8],
      control: { type: 'select' },
    },
    textAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    lineHeight: {
      options: ['none', 'extra-small', 'small', 'standard', 'large'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => <Text {...args} />,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Weight = {
  args: {
    weight: 'bold',
  },
} satisfies Story;
