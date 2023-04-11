import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Range } from './range';

const story: ComponentMeta<typeof Range> = {
  title: 'Inputs/Range',
  component: Range,
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

const Template: ComponentStory<typeof Range> = args => (
  <div style={{ height: 300 }}>
    <Range {...args} />
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
