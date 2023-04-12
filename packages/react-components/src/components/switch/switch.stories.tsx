import { Meta, StoryFn } from '@storybook/react';

import { Switch } from './switch';

const story: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Switch> = args => (
  <Switch {...args} />
);

export const Default = Template.bind({});

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Sample label',
};
