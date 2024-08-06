import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { Emoji as EmojiRender, EmojiStyle } from 'emoji-picker-react';
import { GetEmojiUrl } from 'emoji-picker-react/dist/components/emoji/BaseEmojiProps';
import { FCClass } from 'src/types/custom';

import styles from './emoji-picker.module.css';

export type EmojiProps = {
  unified: string;
  emojiStyle?: EmojiStyle;
  size?: Exclude<TokensTypes['icon']['size'], string>;
  lazyLoad?: boolean;
  getEmojiUrl?: GetEmojiUrl;
  emojiUrl?: string;
}

export const Emoji: FCClass<EmojiProps> = ({
  className,
  unified: emoji = '1f60a',
  emojiStyle = EmojiStyle.NATIVE,
  size = 24,
  ...otherProps
}) => (
  <span className={styles.EmojiRender}>
    <EmojiRender
      unified={emoji}
      size={size}
      emojiStyle={emojiStyle}
      {...otherProps}
    />
  </span>
);

Emoji.displayName = 'Emoji';
