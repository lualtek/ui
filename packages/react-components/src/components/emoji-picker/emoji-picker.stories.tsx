import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { useArgs } from '@storybook/preview-api';
import type {
  Meta,
  StoryObj,
} from '@storybook/react';
import { EmojiClickData } from 'emoji-picker-react';

import { EmojiPicker } from './emoji-picker';

const meta = {
  title: 'Pickers/Emoji picker',
  component: EmojiPicker,
  args: {
    dimension: 'regular',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    chipColor: {
      options: [
        'brand', 'gray', 'cyan', 'green',
        'purple', 'yellow', 'red', 'blue', 'slate',
        'indigo', 'salmon', 'dipsy', 'magenta', 'primary',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof EmojiPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    emoji: '1f609',
    onEmojiClick: emoji => console.log(emoji),
  },
  render: function Render({ ...args }) {
    const [{ unified }, setEmoji] = useArgs<EmojiClickData>();
    const handleEmojiClick = (emojiData: EmojiClickData) => setEmoji({ unified: emojiData.unified });

    return (
      <EmojiPicker
        {...args}
        emoji={unified ?? args.emoji}
        onEmojiClick={handleEmojiClick}
      />
    );
  },
} satisfies Story;

export const WithTextChip = {
  args: {
    emoji: '1f609',
    useChip: true,
    chipColor: 'cyan',
  },
  render: function Render({ ...args }) {
    const [{ unified }, setEmoji] = useArgs<EmojiClickData>();
    const handleEmojiClick = (emojiData: EmojiClickData) => setEmoji({ unified: emojiData.unified });
    const [{ color }, setColor] = useArgs<{ color: TokensTypes['colors'] }>();
    const handleColorClick = (color: TokensTypes['colors']) => setColor({ color });

    return (
      <EmojiPicker
        {...args}
        emoji={unified ?? args.emoji}
        chipColor={color ?? args.chipColor}
        onEmojiClick={handleEmojiClick}
        onColorClick={handleColorClick}
      />
    );
  },
} satisfies Story;
