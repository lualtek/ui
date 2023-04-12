import { Meta, StoryFn } from '@storybook/react';

import { Datetime } from './datetime';

const story: Meta<typeof Datetime> = {
  title: 'Widgets/Datetime',
  component: Datetime,
  argTypes: {
    locale: { type: 'string' },
  },
  args: {
    locale: 'it-IT',
    date: '2021-12-15T16:00:32.507981+00:00',
  },
};

export default story;

const Template: StoryFn<typeof Datetime> = args => <Datetime {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '2021-12-15T16:00:32.507981+00:00',
  options: {
    year: '2-digit',
  },
};
