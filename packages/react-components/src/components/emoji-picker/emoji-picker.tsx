'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { EmojiClickData, PickerProps } from 'emoji-picker-react';
import { FC } from 'react';

import {
  ResponsiveProvider,
  TextChipProps,
} from '@/components';

import { Picker } from './picker';

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
  /**
   * The dimension of the emoji and text chip.
   */
  dimension?: TextChipProps['dimension'];
};

export const EmojiPicker: FC<EmojiPickerProps> = ({
  className,
  theme,
  onColorClick,
  emoji,
  chipColor,
  useChip = false,
  dimension = 'regular',
  ...otherProps
}) => (
  <ResponsiveProvider>
    <Picker
      emoji={emoji}
      dimension={dimension}
      useChip={useChip}
      chipColor={chipColor}
      onColorClick={onColorClick}
      {...otherProps}
    />
  </ResponsiveProvider>
);

EmojiPicker.displayName = 'EmojiPicker';
