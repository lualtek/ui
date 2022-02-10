import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Slider } from './slider';

const story: ComponentMeta<typeof Slider> = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  args: {
    orientation: 'horizontal',
    defaultValue: [30],
    showValues: true,
    onValueChange: value => console.log(value),
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

const Template: ComponentStory<typeof Slider> = args => (
  <div style={{ height: 300 }}>
    <Slider {...args} />
  </div>
);

export const Default = Template.bind({});

export const Double = Template.bind({});
Double.args = {
  defaultValue: [30, 70],
};
