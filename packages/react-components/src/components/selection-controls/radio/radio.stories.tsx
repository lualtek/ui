import { Meta, StoryFn } from '@storybook/react';

import { Chip } from '../..';
import { Radio } from './radio';

const story: Meta<typeof Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
};

export default story;

const Template: StoryFn<typeof Radio> = args => (
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

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
  Et blanditiis dolore natus itaque fugiat eos harum ea veritatis consequatur
  deserunt, maxime similique unde ad veniam quas tempore, laboriosam accusamus nihil.`,
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: <Chip color="green">Rich label</Chip>,
};
