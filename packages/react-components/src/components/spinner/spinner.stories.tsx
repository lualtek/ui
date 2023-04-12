import { Meta, StoryFn } from '@storybook/react';

import { Spinner } from './spinner';

const story: Meta<typeof Spinner> = {
  title: 'Loading/Spinner',
  component: Spinner,
  args: {
    dimension: 'big',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Spinner> = args => <Spinner {...args} />;

export const Default = Template.bind({});
