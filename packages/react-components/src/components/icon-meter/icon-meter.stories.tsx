import { Meta, StoryFn } from '@storybook/react';

import { Stack } from '../..';
import { IconMeter } from './icon-meter';

const story: Meta<typeof IconMeter> = {
  title: 'Widgets/Icon meter',
  component: IconMeter,
  args: {
    dimension: 'regular',
    value: 3.5,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof IconMeter> = args => <Stack><IconMeter {...args} /></Stack>;

export const Default = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Hello there 👋',
};
