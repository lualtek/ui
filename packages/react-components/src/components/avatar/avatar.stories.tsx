import { Meta, StoryFn } from '@storybook/react';

import { Avatar } from './avatar';

const story: Meta<typeof Avatar> = {
  title: 'Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});
