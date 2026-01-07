import type { Meta, StoryObj } from '@storybook/react-vite';

import { ToggleButton } from './toggle-button';

const meta = {
  title: 'Actions/Toggle button',
  component: ToggleButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    restingIcon: 'view',
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
  render: args => <ToggleButton {...args} />,
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const MultipleIcons = {
  args: {
    pressedIcon: 'hide',
  },
} satisfies Story;
