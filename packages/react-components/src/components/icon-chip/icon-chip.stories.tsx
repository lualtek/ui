import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconChip } from './icon-chip';

const story: ComponentMeta<typeof IconChip> = {
  title: 'Widgets/Icon Chip',
  component: IconChip,
  argTypes: {
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
    icon: 'sensor',
  },
};

export default story;

const Template: ComponentStory<typeof IconChip> = args => <IconChip {...args} />;

export const Default = Template.bind({});
Default.args = {
};
