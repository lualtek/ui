import { Meta, StoryFn } from '@storybook/react';

import { Separator } from './separator';

const story: Meta<typeof Separator> = {
  title: 'Layouts/Separator',
  component: Separator,
};

export default story;

export const Default: StoryFn<typeof Separator> = args => <Separator {...args} />;
Default.args = {
  vPadding: 32,
};
