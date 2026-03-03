'use client';

import type { TokensTypes } from '@lualtek/tokens/web';
import clsx from 'clsx';
import type { EmojiClickData } from 'emoji-picker-react';
import type { FC } from 'react';
import { useMemo } from 'react';

import type { TextProps } from '@/components';
import { Emoji, Stack, Text } from '@/components';

import styles from './text-chip.module.css';

export type TextChipProps = React.ComponentPropsWithRef<'span'> & {
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
};

type Sizes = Record<
  string,
  {
    text: Exclude<NonNullable<TextProps['size']>, string>;
    emojiText: Exclude<NonNullable<TextProps['size']>, string>;
    emoji: Exclude<NonNullable<TokensTypes['icon']['size']>, string>;
  }
>;

const sizes: Sizes = {
  small: {
    text: 12,
    emojiText: 18,
    emoji: 16,
  },
  regular: {
    text: 16,
    emojiText: 24,
    emoji: 32,
  },
  big: {
    text: 18,
    emojiText: 32,
    emoji: 40,
  },
};

const emojiRegex = /\p{Extended_Pictographic}/gu;

export const TextChip: FC<TextChipProps> = ({
  text,
  style,
  className,
  dimension = 'regular',
  color = 'primary',
  tinted = true,
  emoji,
  ref: forwardedRef,
  ...otherProps
}) => {
  const isEmoji = useMemo(() => text && emojiRegex.test(text), [text]);
  const dynamicStyle = useMemo(
    () => ({
      '--background': `var(--highlight-${color}-background)`,
      '--foreground': `var(--highlight-${color}-foreground)`,
    }),
    [color],
  );

  return (
    <Stack
      as="span"
      direction="row"
      inline
      ref={forwardedRef}
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
        size={isEmoji ? sizes[dimension]?.emojiText : sizes[dimension]?.text}
        weight="bold"
        as="span"
      >
        {text && !emoji && text.slice(0, 2)}
        {emoji && <Emoji unified={emoji} size={sizes[dimension]?.emoji} />}
      </Text>
    </Stack>
  );
};
