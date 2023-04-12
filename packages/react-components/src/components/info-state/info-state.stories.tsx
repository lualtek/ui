import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../..';
import { InfoState } from './info-state';

const story: Meta<typeof InfoState> = {
  title: 'Dialogs/InfoState',
  component: InfoState,
  args: {
    title: 'Sample very long title',
  },
  argTypes: {
    iconColor: {
      options: ['brand', 'gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: StoryFn<typeof InfoState> = args => (
  <InfoState {...args}>
    Cras ultricies, elit sit amet cursus consectetur,
    risus felis ullamcorper nulla, ut scelerisque sapien lorem non sem.
  </InfoState>
);

export const Default = Template.bind({});
Default.args = {
  icon: 'bell',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'row',
  icon: 'bell',
};

export const WithImage = Template.bind({});
WithImage.args = {
  image: 'https://svgshare.com/i/b5f.svg',
};

export const WithImageHorizontal = Template.bind({});
WithImageHorizontal.args = {
  direction: 'row',
  image: 'https://svgshare.com/i/b5f.svg',
};

export const WithActions = Template.bind({});
WithActions.args = {
  actions:
  <>
    <Button>Primary</Button>
    <Button kind="flat">Secondary</Button>
  </>,
};
