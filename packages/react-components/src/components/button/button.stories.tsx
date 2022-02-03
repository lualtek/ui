import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '.';

const story: ComponentMeta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  args: {
    dimension: 'regular',
    kind: 'primary',
    children: 'Click me',
    fullWidth: false,
    disabled: false,
    busy: false,
    pressed: false,
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
};

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  children: 'Ciao',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Ciao',
  icon: 'chat',
  iconPosition: 'left',
  iconColor: 'currentColor',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  children: 'Ciao',
  // icon: <CustomReactIcon />,
};

export default story;
