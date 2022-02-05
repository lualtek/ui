import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch } from './switch';

const story: ComponentMeta<typeof Switch> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Switch> = args => (
  <Switch onCheckedChange={value => console.log(value)} {...args} />
);

export const Default = Template.bind({});

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true,
};
