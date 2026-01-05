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

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { Emoji as EmojiRender, EmojiStyle } from 'emoji-picker-react';
import { GetEmojiUrl } from 'emoji-picker-react/dist/components/emoji/BaseEmojiProps';
import { useMemo } from 'react';

import styles from './emoji-picker.module.css';

export type EmojiProps = {
  unified: string;
  emojiStyle?: EmojiStyle;
  size?: Exclude<TokensTypes['icon']['size'], string>;
  lazyLoad?: boolean;
  getEmojiUrl?: GetEmojiUrl;
  emojiUrl?: string;
  className?: string;
}

export const Emoji: React.FC<EmojiProps> = ({
  className,
  unified = '1f346',
  emojiStyle = EmojiStyle.NATIVE,
  size = 24,
  ...otherProps
}) => {
  const computedSize = useMemo(() => size / 1.2, [size]);

  return (
    <span className={styles.EmojiRender}>
      <EmojiRender
        unified={unified}
        size={computedSize}
        emojiStyle={emojiStyle}
        {...otherProps}
      />
    </span>
  );
};
