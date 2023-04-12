import { Meta, StoryFn } from '@storybook/react';

import { Slider } from './slider';

const story: Meta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  args: {
    orientation: 'horizontal',
    defaultValue: [30],
    showValues: true,
  },
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Slider> = args => (
  <div style={{ height: 300 }}>
    <Slider {...args} />
  </div>
);

export const Default = Template.bind({});

export const Double = Template.bind({});
Double.args = {
  defaultValue: [30, 70],
};

export const ValueLabel = Template.bind({});
ValueLabel.args = {
  defaultValue: [6000, 9000],
  min: 5000,
  max: 10000,
  valueLabel: val => (val ? `${new Intl.NumberFormat('en-GB').format(val)}K` : ''),
};
