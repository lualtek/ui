import type { Meta, StoryObj } from '@storybook/react';

import { SplitButton } from './split-button';

const meta = {
  title: 'Actions/Split button',
  component: SplitButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    label: 'Click me',
    fullWidth: false,
    disabled: false,
    busy: false,
    offset: 8,
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <SplitButton {...args}>
      <div
        style={{
          padding: 24, background: 'var(--dimmed-2)', width: 300, borderRadius: 16,
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Distinctio aliquam exercitationem ut? Molestias repellat facilis totam non.
      </div>
    </SplitButton>
  ),
} satisfies Meta<typeof SplitButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;
