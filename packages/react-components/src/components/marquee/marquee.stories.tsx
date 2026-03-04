import type { Meta, StoryObj } from '@storybook/react-vite';

import { Marquee } from './marquee';

const meta = {
  title: 'Widgets/Marquee',
  component: Marquee,
  args: {
    gap: 8,
  },
  render: (args) => (
    <Marquee {...args}>
      <img alt="Logo" width="600" height="400" data-chromatic="ignore" src="https://picsum.photos/600/400" />
      <img
        alt="Logo"
        width="600"
        height="400"
        data-chromatic="ignore"
        src="https://picsum.photos/seed/picsum/600/400"
      />
    </Marquee>
  ),
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithFade = {
  args: {
    fade: true,
  },
} satisfies Story;
