import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Stack } from '../..';
import { IconMeter } from './icon-meter';

const story: ComponentMeta<typeof IconMeter> = {
  title: 'Components/Widgets/Icon meter',
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

const Template: ComponentStory<typeof IconMeter> = args => <Stack><IconMeter {...args} /></Stack>;

export const Default = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Hello there 👋',
};
