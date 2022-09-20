import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from './radio';

const story: ComponentMeta<typeof Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
};

export default story;

const Template: ComponentStory<typeof Radio> = args => (
  <fieldset>
    <Radio {...args} defaultChecked value="1" name="story" />
    <Radio {...args} value="2" name="story" />
    <Radio {...args} value="3" name="story" />
  </fieldset>
);

export const Default = Template.bind({});

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  disabled: true,
};
