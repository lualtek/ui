import type { Meta, StoryObj } from '@storybook/react-vite';
import { forwardRef, useState } from 'react';

import { Button, Stack } from '@/components';

import { Textfield, TextfieldProps } from './textfield';

// eslint-disable-next-line no-useless-escape
const pattern = /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s\-_.()<>"&\/+^$*!?@#%~|:;]*$/;

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
        <Textfield {...args} label="Filled" />
        <Textfield {...args} label="Filled read only" readOnly />
        <Textfield {...args} label="Empty disbled" placeholder="Placeholder" disabled />
        <Textfield {...args} label="Filled disabled" disabled />
        <Textfield {...args} type="email" required label="Type email" defaultValue="" />
        <Textfield {...args} type="password" label="Type password" defaultValue="912435jh345" />
        <Textfield {...args} type="number" label="Type number" defaultValue={100} />
        <Textfield {...args} type="search" showClearButton label="Type search" />
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

export const Disabled = {
  args: {
    label: 'Sample label',
    disabled: true,
    defaultValue: 100,
    type: 'number',
  },
} satisfies Story;

export const WithIcon = {
  args: {
    label: 'Sample label',
    iconPosition: 'start',
    icon: 'chat',
  },
  render: args => (
    <div style={{ padding: 32, background: 'var(--dimmed-2)' }}>
      <Stack rowGap={24}>
        <Textfield {...args} label="Filled" />
        <Textfield {...args} label="Filled read only" readOnly />
        <Textfield {...args} label="Empty disbled" placeholder="Placeholder" />
        <Textfield {...args} label="Filled disabled" />
        <Textfield {...args} type="email" required label="Type email" defaultValue="" />
        <Textfield {...args} type="password" label="Type password" defaultValue="912435jh345" />
        <Textfield {...args} type="number" label="Type number" defaultValue={100} />
        <Textfield {...args} type="search" showClearButton label="Type search" />
        <Textfield {...args} type="date" label="Type date" />
        <Textfield {...args} type="time" label="Type time" />
        <Textfield {...args} type="month" label="Type month" />
        <Textfield {...args} type="week" label="Type week" />
        <Textfield {...args} type="datetime-local" label="Type datetime-local" />
      </Stack>
    </div>
  ),
} satisfies Story;

const SearchTemplate = forwardRef<HTMLInputElement, TextfieldProps>(({ value, ...props }) => {
  const [stateValue, setStateValue] = useState<TextfieldProps['value']>(value ?? '');

  return (
    <>
      <Textfield
        {...props}
        onChange={({ currentTarget }) => setStateValue(currentTarget.value)}
        onClear={() => setStateValue('')}
        value={stateValue}
      />
      <Textfield
        {...props}
        onClear={() => setStateValue('')}
        defaultValue="ciao"
      />
    </>
  );
});

export const WithActionButton = {
  args: {
    label: 'Search',
    icon: 'chat',
    showClearButton: true,
    value: 'Sample value',
    defaultValue: undefined,
  },
  render: args => <SearchTemplate {...args} />,
} satisfies Story;

export const Invalid = {
  args: {
    label: 'Sample label',
    iconPosition: 'start',
    hint: {
      invalid: 'Invalid hint',
    },
    icon: 'chat',
  },
  render: args => (
    <Stack as="form" rowGap={16}>
      <Textfield {...args} type="email" label="Type email" required defaultValue="" />
      <Textfield
        {...args}
        type="text"
        pattern={new RegExp(pattern).toString().slice(1, -1)}
        label="Type text with pattern"
        defaultValue=""
        invalid
      />
      <Button type="submit">Submit</Button>
    </Stack>
  ),
} satisfies Story;

export const forcedInvalid = {
  args: {
    label: 'Sample label',
    iconPosition: 'start',
    icon: 'chat',
    invalid: true,
  },
  render: args => <Textfield {...args} type="email" required label="Type email" defaultValue="" />,
} satisfies Story;
