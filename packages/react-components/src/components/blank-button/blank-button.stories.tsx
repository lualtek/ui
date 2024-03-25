import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '../..';
import { BlankButton } from './blank-button';

const meta = {
  title: 'Actions/Blank Button',
  component: BlankButton,
  render: args => (
    <BlankButton onClick={() => alert('Clicked')} {...args}>
      <img data-chromatic="ignore" height={200} src="https://mighty.tools/mockmind-api/content/human/40.jpg" alt="" />
    </BlankButton>
  ),
} satisfies Meta<typeof BlankButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const AsStack = {
  render: args => (
    <Stack vPadding={40} hPadding={40} as={BlankButton} onClick={() => alert('Clicked')} {...args}>
      <img data-chromatic="ignore" height={200} src="https://mighty.tools/mockmind-api/content/human/40.jpg" alt="" />
    </Stack>
  ),
} satisfies Story;
