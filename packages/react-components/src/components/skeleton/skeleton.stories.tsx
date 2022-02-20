import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Skeleton } from './skeleton';

const story: ComponentMeta<typeof Skeleton> = {
  title: 'Components/Loading/Skeleton',
  component: Skeleton,
  args: {
    enableAnimation: true,
    inline: false,
  },
};

export default story;

const Template: ComponentStory<typeof Skeleton> = args => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  count: 4,
  height: '48px',
};

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  width: '80px',
  height: '80px',
};

export const Rounded = Template.bind({});
Rounded.args = {
  width: '400px',
  height: '248px',
};
