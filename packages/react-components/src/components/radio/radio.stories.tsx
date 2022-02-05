import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio, RadioGroup } from './radio';

const story: ComponentMeta<typeof Radio> = {
  title: 'Components/Inputs/Radio',
  component: Radio,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof RadioGroup & typeof Radio> = args => (
  <RadioGroup defaultValue="1" onValueChange={value => console.log(value)}>
    <Radio {...args} value="1" />
    <Radio {...args} value="2" />
    <Radio {...args} value="3" />
  </RadioGroup>
);

export const Default = Template.bind({});

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true,
};
