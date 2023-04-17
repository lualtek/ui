import type { Meta, StoryFn } from '@storybook/react';

import { Title } from '../..';
import { GradientText } from './gradient-text';

const story: Meta<typeof GradientText> = {
  title: 'Typography/Gradient Text',
  component: GradientText,
  args: {
    gradient: 'rainbow',
  },
  argTypes: {
    gradient: {
      options: ['rainbow', 'brand', 'primary', 'cyan', 'dawn'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: StoryFn<typeof GradientText> = args => (
  <Title level="4">
    <GradientText {...args}>
      Gradient Title
    </GradientText>
  </Title>
);

export const Default = Template.bind({});
export const CustomColors = Template.bind({});
CustomColors.args = {
  colorStart: 'red',
  colorEnd: 'blue',
};
