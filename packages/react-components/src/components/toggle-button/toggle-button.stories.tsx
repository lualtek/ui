import { Meta, StoryFn } from '@storybook/react';

import { ToggleButton } from './toggle-button';

const story: Meta<typeof ToggleButton> = {
  title: 'Actions/Toggle button',
  component: ToggleButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    restingIcon: 'view',
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof ToggleButton> = args => <ToggleButton {...args} />;

export const Default = Template.bind({});

export const MultipleIcons = Template.bind({});
MultipleIcons.args = {
  pressedIcon: 'hide',
};
