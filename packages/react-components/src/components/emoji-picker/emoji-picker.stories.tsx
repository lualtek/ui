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

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { EmojiPicker } from './emoji-picker';

const meta = {
  title: 'Pickers/Emoji picker',
  component: EmojiPicker,
  args: {},
} satisfies Meta<typeof EmojiPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    onEmojiClick: emoji => console.log(emoji),
  },
} satisfies Story;

export const WithColor = {
  args: {
    onEmojiClick: emoji => console.log(emoji),
    onColorClick: color => console.log(color),
  },
} satisfies Story;
