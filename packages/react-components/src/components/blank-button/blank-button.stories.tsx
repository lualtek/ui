import type { Meta, StoryObj } from '@storybook/react';

import { BlankButton } from './blank-button';

const meta = {
  title: 'Actions/Blank Button',
  component: BlankButton,
  render: args => (
    <BlankButton onClick={() => alert('Clicked')} {...args}>
      <img data-chromatic="ignore" src="https://api.lorem.space/image/game?w=150&h=220" alt="" />
    </BlankButton>
  ),
} satisfies Meta<typeof BlankButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
