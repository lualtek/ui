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

'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import ReactEmojiPicker, {
  EmojiStyle,
  PickerProps, SkinTonePickerLocation, Theme,
} from 'emoji-picker-react';
import { FC } from 'react';

import {
  BlankButton,
  Grid,
  Separator,
  Stack,
} from '@/components';

import styles from './emoji-picker.module.css';

export type EmojiPickerProps = PickerProps & {
  /**
   * Callback when a color name is clicked.
   */
  onColorClick?: (color: TokensTypes['colors']) => void;
};

const highlightColorToExclude = ['support'];

const highlightKeys = Object.keys(
  tkns.color as Record<TokensTypes['colors'], unknown>,
).filter(i => !highlightColorToExclude.includes(i)).map(item => item);

export const EmojiPicker: FC<EmojiPickerProps> = ({
  className,
  theme,
  onColorClick,
  ...otherProps
}) => (
  <Stack>
    {onColorClick && (
      <>
        <Grid colMinWidth="24px" rowGap={8} columnGap={8} hPadding={16} vPadding={16}>
          {highlightKeys.map(color => (
            <Grid.Item key={color}>
              <BlankButton
                className={styles.ColorSwatch}
                onClick={() => onColorClick?.(color as TokensTypes['colors'])}
                style={{ '--swatch-background': `var(--highlight-${color}-background)` }}
              />
            </Grid.Item>
          ))}
        </Grid>
        <Separator />
      </>
    )}
    <ReactEmojiPicker
      width="100%"
      {...otherProps}
      lazyLoadEmojis
      theme={theme ?? Theme.AUTO}
      skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
      className={styles.Picker}
      emojiStyle={EmojiStyle.NATIVE}
      emojiVersion="15.0"
      autoFocusSearch={false}
    />
  </Stack>
);
