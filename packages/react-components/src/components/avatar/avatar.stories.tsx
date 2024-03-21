import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '../..';
import { Avatar } from './avatar';

const meta = {
  title: 'Widgets/Avatar',
  component: Avatar,
  args: {
    src: 'https://mighty.tools/mockmind-api/content/human/72.jpg',
  },
  render: function Renderer(args) {
    return (
      <Stack direction="row" fill={false} inline columnGap={8}>
        <Avatar {...args} />
        <Avatar {...args} src="" />
      </Stack>
    );
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    dimension: 'small',
  },
} satisfies Story;

export const Regular = {
  args: {
    dimension: 'regular',
  },
} satisfies Story;

export const Big = {
  args: {
    dimension: 'big',
  },
} satisfies Story;
