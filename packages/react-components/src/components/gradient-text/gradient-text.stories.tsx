import type { Meta, StoryObj } from '@storybook/react';

import { Title } from '../..';
import { GradientText } from './gradient-text';

const meta = {
  title: 'Typography/Gradient Text',
  component: GradientText,
  render: (args) => (
    <Title level="4">
      <GradientText {...args}>Gradient Title</GradientText>
    </Title>
  ),
  argTypes: {
    gradient: {
      options: ['rainbow', 'brand', 'primary', 'cyan', 'dawn'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof GradientText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    gradient: 'rainbow',
  },
} satisfies Story;

export const CustomColors = {
  args: {
    colorStart: 'red',
    colorEnd: 'blue',
  },
} satisfies Story;
