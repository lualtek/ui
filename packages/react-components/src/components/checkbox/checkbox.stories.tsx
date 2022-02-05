import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Checkbox, CheckboxProps } from './checkbox';

const story: ComponentMeta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
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

const TemplateIndeterminate: ComponentStory<typeof Checkbox> = (args) => {
  const [isChecked, setIsChecked] = useState<CheckboxProps['checked']>('indeterminate');

  return <Checkbox checked={isChecked} onCheckedChange={setIsChecked} {...args} />;
};

export const Indeterminate = TemplateIndeterminate.bind({});

