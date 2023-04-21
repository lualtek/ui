import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Textarea as Area } from './textarea';

const story: ComponentMeta<typeof Area> = {
  title: 'Inputs/Textarea',
  component: Area,
  args: {
    readOnly: false,
  },
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    readOnly: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    invalid: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const TextareaTemplate: ComponentStory<typeof Area> = args => (
  <Area {...args} required placeholder="Placeholder" />
);

export const Textarea = TextareaTemplate.bind({});
Textarea.args = {
  rows: 10,
};
export const WithLabel = TextareaTemplate.bind({});
WithLabel.args = {
  label: 'Sample label',
};
