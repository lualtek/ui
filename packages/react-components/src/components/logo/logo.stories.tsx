import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Logo } from './logo';

const story: ComponentMeta<typeof Logo> = {
  title: 'Widgets/Logo',
  component: Logo,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default story;

export const Default: ComponentStory<typeof Logo> = args => <Logo width="300px" {...args} />;
Default.args = {
  trim: false,
};
