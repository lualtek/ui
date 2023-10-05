import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/components';

import { Textfield } from './textfield';

const meta = {
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
      options: ['start', 'end'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => <Textfield {...args} size={4} placeholder="Placeholder" />,
} satisfies Meta<typeof Textfield>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single = {
  args: {
    label: 'Sample label',
    disabled: false,
  },
} satisfies Story;

export const Types = {
  render: args => (
    <div style={{ padding: 32, background: 'var(--dimmed-2)' }}>
      <Stack rowGap={24}>
        <Textfield {...args} label="Filled" defaultValue="Sample value" />
        <Textfield {...args} label="Filled read only" defaultValue="Sample value" readOnly />
        <Textfield {...args} label="Empty disbled" placeholder="Placeholder" disabled />
        <Textfield {...args} label="Filled disabled" defaultValue="Sample value" disabled />
        <Textfield {...args} type="email" required label="Type email" defaultValue="" />
        <Textfield {...args} type="password" label="Type password" defaultValue="912435jh345" />
        <Textfield {...args} type="number" label="Type number" defaultValue={100} />
        <Textfield {...args} type="search" label="Type search" />
        <Textfield {...args} type="date" label="Type date" />
        <Textfield {...args} type="time" label="Type time" />
        <Textfield {...args} type="month" label="Type month" />
        <Textfield {...args} type="week" label="Type week" />
        <Textfield {...args} type="datetime-local" label="Type datetime-local" />
      </Stack>
    </div>
  ),
  args: {
    label: 'Sample label',
    disabled: false,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    label: 'Sample label',
    iconPosition: 'start',
    icon: 'chat',
  },
} satisfies Story;
