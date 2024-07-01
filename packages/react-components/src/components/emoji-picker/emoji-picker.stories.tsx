import type {
  Meta,
  StoryObj,
} from '@storybook/react';

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
