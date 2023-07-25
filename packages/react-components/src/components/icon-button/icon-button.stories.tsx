import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './icon-button';

const meta = {
  title: 'Actions/Icon Button',
  component: IconButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    icon: 'chat',
    busy: false,
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    sentiment: {
      options: [undefined, 'positive', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    busy: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

