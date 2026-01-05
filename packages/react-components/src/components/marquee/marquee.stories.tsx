/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Marquee } from './marquee';

const meta = {
  title: 'Widgets/Marquee',
  component: Marquee,
  args: {
    gap: 8,
  },
  render: args => (
    <Marquee {...args}>
      <img width="600" height="400" data-chromatic="ignore" src="https://picsum.photos/600/400" />
      <img width="600" height="400" data-chromatic="ignore" src="https://picsum.photos/seed/picsum/600/400" />
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
