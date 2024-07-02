'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import Picker, {
  Emoji, EmojiClickData,
  EmojiStyle, PickerProps, SkinTonePickerLocation, Theme,
} from 'emoji-picker-react';
import { FC } from 'react';

import {
  BlankButton, Elevator, Grid, Panel, Popover, Separator, Stack,
  TextChip,
  TextChipProps,
  TextProps,
} from '@/components';

import styles from './emoji-picker.module.css';

export type EmojiPickerProps = PickerProps & {
  /**
   * The unified emoji code to display.
   */
  emoji: EmojiClickData['unified'];
  /**
   * Use the `TextChip` component to render the emoji.
   *
   * @defaultValue false
   */
  useChip?: boolean;
  /**
   * The color of the chip. Used only when `useChip` is `true`.
   */
  chipColor?: TextChipProps['color'];
  /**
   * Callback when a color name is clicked.
   */
  onColorClick?: (color: TokensTypes['colors']) => void;
  dimension?: TextChipProps['dimension'];
};

type Sizes = Record<string, {
  emoji: Exclude<NonNullable<TextProps['size']>, string>;
}>

const sizes: Sizes = {
  small: {
    emoji: 18,
  },
  regular: {
    emoji: 24,
  },
  big: {
    emoji: 32,
  },
};

const highlightColorToExclude = ['support'];

const highlightKeys = Object.keys(
  tkns.color as Record<TokensTypes['colors'], unknown>,
).filter(i => !highlightColorToExclude.includes(i)).map(item => item);

export const EmojiPicker: FC<EmojiPickerProps> = ({
  className,
  lazyLoadEmojis = true,
  theme,
  onColorClick,
  emoji,
  chipColor,
  useChip = false,
  dimension = 'regular',
  ...otherProps
}) => (
  <Popover>
    <Popover.Trigger>
      <BlankButton>
        {useChip ? (
          <TextChip
            emoji={emoji}
            color={chipColor}
            dimension={dimension}
            tinted={false}
          />
        ) : (
          <Emoji
            unified={emoji}
            size={sizes[dimension].emoji / 1.2}
          />
        )}
      </BlankButton>
    </Popover.Trigger>
    <Popover.Content side="right" offset={16} align="start">
      <Elevator resting={4}>
        <Panel
          bordered
          radius={16}
          vibrant
          vibrancyColor="background"
        >
          <Stack className={clsx(className)}>
            {useChip && (
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
            <Picker
              {...otherProps}
              lazyLoadEmojis={lazyLoadEmojis}
              theme={theme ?? Theme.AUTO}
              skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
              className={styles.Picker}
              emojiStyle={EmojiStyle.NATIVE}
              emojiVersion="15.0"
            />
          </Stack>
        </Panel>
      </Elevator>
    </Popover.Content>
  </Popover>
);

EmojiPicker.displayName = 'EmojiPicker';
