import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Label } from './label';

const story: ComponentMeta<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
  args: {
    maxWidth: 'auto',
    children: 'Lorem ipsum dolor sit.',
  },
  argTypes: {
    size: {
      options: [14, 16, 18, 22, 28],
      control: { type: 'select' },
    },
    sentiment: {
      options: ['positive', 'informative', 'danger', 'warning'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Label> = args => <Label {...args} />;

export const Default = Template.bind({});
