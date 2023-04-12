import { Meta, StoryFn } from '@storybook/react';

import { Chip } from './chip';

const story: Meta<typeof Chip> = {
  title: 'Widgets/Chip',
  component: Chip,
  argTypes: {
    onDismissClick: {
      action: 'dismissed',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: ['brand', 'gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    dismissable: false,
  },
};

export default story;

const Template: StoryFn<typeof Chip> = args => (
  <>
    <Chip {...args}>Chip text</Chip>
    <Chip>Chip text</Chip>
  </>
);

export const Default = Template.bind({});
Default.args = {
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'device',
};
