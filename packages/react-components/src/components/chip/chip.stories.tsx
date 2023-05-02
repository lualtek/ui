import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Chip } from './chip';

const story: ComponentMeta<typeof Chip> = {
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
      options: [
        'brand', 'gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue', 'indigo', 'salmon', 'dipsy', 'magenta'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    dismissable: false,
  },
};

export default story;

const Template: ComponentStory<typeof Chip> = args => (
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
