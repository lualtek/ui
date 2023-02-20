import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Stack } from '@/components';

import { Textfield } from './textfield';

const story: ComponentMeta<typeof Textfield> = {
  title: 'Inputs/Textfield',
  component: Textfield,
  args: {
    readOnly: false,
    defaultValue: 'Sample value',
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
    iconPosition: {
      options: ['left', 'right', undefined],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const SingleTemplate: ComponentStory<typeof Textfield> = args => (
  <Stack rowGap={24}>
    <Textfield {...args} size={4} label="Empty" placeholder="Placeholder" />
    <Textfield {...args} size={4} label="Empty" placeholder="Placeholder" />
    <Textfield {...args} size={4} label="Empty" placeholder="Placeholder" />
    <Textfield {...args} type="password" autoComplete="current-password" label="Password" placeholder="Placeholder" />
  </Stack>
);

const MultipleTemplate: ComponentStory<typeof Textfield> = args => (
  <Stack rowGap={24}>
    <Textfield {...args} label="Filled" defaultValue="Sample value" />
    <Textfield {...args} label="Filled read only" defaultValue="Sample value" readOnly />
    <Textfield {...args} label="Empty disbled" placeholder="Placeholder" disabled />
    <Textfield {...args} label="Filled disabled" defaultValue="Sample value" disabled />
    <Textfield {...args} type="password" label="Type password" defaultValue="912435jh345" />
    <Textfield {...args} type="number" label="Type number" defaultValue={100} />
    <Textfield {...args} type="search" label="Type search" />
    <Textfield {...args} type="date" label="Type date" />
    <Textfield {...args} type="time" label="Type time" />
    <Textfield {...args} type="month" label="Type month" />
    <Textfield {...args} type="week" label="Type week" />
    <Textfield {...args} type="datetime-local" label="Type datetime-local" />
  </Stack>
);

export const Single = SingleTemplate.bind({});
Single.args = {
  disabled: false,
};

export const Types = MultipleTemplate.bind({});
Types.args = {
  disabled: false,
};

export const WithIcon = SingleTemplate.bind({});
WithIcon.args = {
  icon: 'chat',
  type: 'date',
};
