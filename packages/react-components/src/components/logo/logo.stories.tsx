import { Meta, StoryFn } from '@storybook/react';

import { Logo } from './logo';

const story: Meta<typeof Logo> = {
  title: 'Widgets/Logo',
  component: Logo,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default story;

export const Default: StoryFn<typeof Logo> = args => <Logo width="300px" {...args} />;
Default.args = {
  trim: false,
};
