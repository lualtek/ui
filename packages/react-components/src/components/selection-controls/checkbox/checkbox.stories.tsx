import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Chip } from '../..';
import { Checkbox } from './checkbox';

const story: ComponentMeta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
  defaultChecked: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  indeterminate: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Etblanditiis dolore natus itaque
    fugiat eos harum ea veritatis consequatur deserunt, maxime similique unde ad veniam quas
    tempore, laboriosam accusamus nihil.`,
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: <Chip color="green">Rich label</Chip>,
};
