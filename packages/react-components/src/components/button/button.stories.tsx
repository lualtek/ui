import type { Meta, StoryObj } from '@storybook/react';
import type { SVGAttributes } from 'react';

import { Button } from '.';
import { Stack, ToggleButton } from '..';

const meta = {
  title: 'Actions/Button',
  component: Button,
  render: (args) => (
    <Stack columnGap={16} direction="row" fill={false}>
      <Button {...args} />
      <ToggleButton restingIcon="sun" kind="secondary" />
      <Button {...args} kind="secondary" />
      <Button {...args} kind="flat" />
    </Stack>
  ),
  args: {
    dimension: 'regular',
    kind: 'primary',
    children: 'Click me',
    iconPosition: 'start',
    fullWidth: false,
    disabled: false,
    busy: false,
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
    sentiment: {
      options: [undefined, 'positive', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['start', 'end'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const CustomReactIcon = ({ ...props }: SVGAttributes<SVGElement | SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 256 256" fill="currentColor">
    <title>Custom React Icon</title>
    {/* eslint-disable-next-line max-len */}
    <path d="M128 16a96.2 96.2 0 0 0-96 96c0 24 12.6 55.1 33.6 83s44.5 45 62.4 45 41.2-16.8 62.4-45 33.6-59 33.6-83a96.2 96.2 0 0 0-96-96ZM64 116v-4a12 12 0 0 1 12-12 36 36 0 0 1 36 36v4a12 12 0 0 1-12 12 36 36 0 0 1-36-36Zm80 84h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16Zm48-84a36 36 0 0 1-36 36 12 12 0 0 1-12-12v-4a36 36 0 0 1 36-36 12 12 0 0 1 12 12Z" />
  </svg>
);

export const Default = {} satisfies Story;

export const WithIcon = {
  args: {
    icon: 'chat',
    iconColor: 'currentColor',
  },
} satisfies Story;

export const WithCustomIcon = {
  args: {
    icon: <CustomReactIcon />,
  },
} satisfies Story;
