import ReactEmojiPicker, {
  EmojiStyle, PickerProps as ReactEmojiPickerProps,
  SkinTonePickerLocation, Theme,
} from 'emoji-picker-react';

import { FCChildrenClass } from '@/components/types';

import styles from './emoji-picker.module.css';

export type PickerProps = ReactEmojiPickerProps

export const Picker: FCChildrenClass<PickerProps> = ({
  className,
  lazyLoadEmojis = true,
  theme,
  ...otherProps
}) => (
  <ReactEmojiPicker
    {...otherProps}
    lazyLoadEmojis={lazyLoadEmojis}
    theme={theme ?? Theme.AUTO}
    skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
    className={styles.Picker}
    emojiStyle={EmojiStyle.NATIVE}
  />
);

Picker.displayName = 'Picker';
