'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { Emoji, EmojiClickData } from 'emoji-picker-react';
import { useMemo } from 'react';

import {
  Stack, Text, TextProps,
} from '@/components';
import { FCClass } from '@/components/types';

import styles from './text-chip.module.css';

export type TextChipProps = {
  /**
   * Set the dimension of the component.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   * @defaultValue "primary"
   */
  color?: TokensTypes['colors'];
  /**
   * Set the text content. Max 2 characters or 1 emoji.
   */
  text?: string;
  /**
   * Match the emoji color with the chip color.
   * @defaultValue true
   */
  tinted?: boolean;
  /**
   * The emoji unified code to display.
   */
  emoji?: EmojiClickData['unified'];
}

type Sizes = Record<string, {
  text: Exclude<NonNullable<TextProps['size']>, string>;
  emoji: Exclude<NonNullable<TextProps['size']>, string>;
}>

const sizes: Sizes = {
  small: {
    text: 12,
    emoji: 18,
  },
  regular: {
    text: 16,
    emoji: 24,
  },
  big: {
    text: 18,
    emoji: 32,
  },
};

const emojiRegex = /\p{Extended_Pictographic}/ug;

export const TextChip: FCClass<TextChipProps> = ({
  text,
  style,
  className,
  dimension = 'regular',
  color = 'primary',
  tinted = true,
  emoji,
  ...otherProps
}) => {
  const isEmoji = useMemo(() => text && emojiRegex.test(text), [text]);
  const dynamicStyle = useMemo(() => ({
    '--background': `var(--highlight-${color}-background)`,
    '--foreground': `var(--highlight-${color}-foreground)`,
  }), [color]);

  return (
    <Stack
      as="span"
      direction="row"
      inline
      fill={false}
      data-text-chip-dimension={dimension}
      data-text-chip-tinted={tinted}
      className={clsx(styles.TextChip, className)}
      vAlign="center"
      hAlign="center"
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <Text
        className={styles.TextWrapper}
        align="center"
        size={isEmoji ? sizes[dimension]?.emoji : sizes[dimension]?.text}
        weight="bold"
        as="span"
      >
        {(text && !emoji) && text.slice(0, 2)}
        {(emoji) && <Emoji unified={emoji} size={sizes[dimension]?.emoji / 1.2} /> }
      </Text>
    </Stack>
  );
};

TextChip.displayName = 'TextChip';
