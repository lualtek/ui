import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './title';

const meta = {
  title: 'Typography/Title',
  component: Title,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    responsive: true,
    textAlign: 'center',
  },
  argTypes: {
    level: {
      options: ['display', '1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
    },
    lineHeight: {
      options: ['none', 'small', 'large'],
      control: { type: 'inline-radio' },
    },
    textAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <Title {...args}>Sample title</Title>
  ),
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    as: 'span',
    lineHeight: 'small',
    level: '1',
    maxWidth: 'auto',
    textAlign: 'center',
  },
} satisfies Story;
