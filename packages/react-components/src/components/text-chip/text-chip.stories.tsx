import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { EmojiClickData } from 'emoji-picker-react';

import { TextChip } from './text-chip';

const meta = {
  title: 'Badges/Text Chip',
  component: TextChip,
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: [
        'brand', 'gray', 'cyan', 'green',
        'purple', 'yellow', 'red', 'blue', 'slate',
        'indigo', 'salmon', 'dipsy', 'magenta', 'primary',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    tinted: true,
    color: 'cyan',
  },
  render: args => <TextChip {...args} />,
} satisfies Meta<typeof TextChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    text: '1.11',
  },
} satisfies Story;

export const WithEmoji = {
  args: {
    text: '🥲',
  },
} satisfies Story;

export const WithEmojiPicker = {
  args: {
    showEmojiPicker: true,
    tinted: false,
    dimension: 'big',
    color: 'green',
    emoji: '1f609',
  },
  render: function Render({ ...args }) {
    const [{ unified }, setEmoji] = useArgs<EmojiClickData>();
    const handleEmojiClick = (emojiData: EmojiClickData) => setEmoji({ unified: emojiData.unified });
    const [{ color }, setColor] = useArgs<{ color: TokensTypes['colors'] }>();
    const handleColorClick = (color: TokensTypes['colors']) => setColor({ color });

    return (
      <TextChip
        {...args}
        emoji={unified ?? args.emoji}
        color={color ?? args.color}
        onEmojiClick={handleEmojiClick}
        onColorClick={handleColorClick}
      />
    );
  },
} satisfies Story;
