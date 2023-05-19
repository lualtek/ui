import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextChip } from './text-chip';

const story: ComponentMeta<typeof TextChip> = {
  title: 'Badges/Text Chip',
  component: TextChip,
  argTypes: {
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
    tinted: true,
  },
};

export default story;

const Template: ComponentStory<typeof TextChip> = args => <TextChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '1.11',
};

export const WithEmoji = Template.bind({});
WithEmoji.args = {
  text: '🥲',
};
