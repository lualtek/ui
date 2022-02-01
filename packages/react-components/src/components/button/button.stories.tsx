import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '.';

const story: ComponentMeta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
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

const GroupTemplate: ComponentStory<typeof Button> = () => (
  <>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
  </>
);

export const Grouped = GroupTemplate.bind({});
Grouped.args = {};

export default story;
