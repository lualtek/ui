import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import ReactEmojiPicker, {
  Emoji,
  EmojiStyle,
  SkinTonePickerLocation, Theme,
} from 'emoji-picker-react';

import {
  BlankButton, Elevator, EmojiPickerProps, Grid, Modal, Panel, Popover, Separator, TextChip,
  TextProps,
  useResponsiveContext,
} from '@/components';
import { FCChildrenClass } from '@/components/types';

import styles from './emoji-picker.module.css';

export type PickerProps = Pick<
EmojiPickerProps,
'useChip' | 'chipColor' | 'theme' | 'emoji' | 'dimension' | 'onColorClick'
>

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

export const Picker: FCChildrenClass<PickerProps> = ({
  className,
  theme,
  useChip,
  chipColor,
  emoji,
  dimension = 'regular',
  onColorClick,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return matches.extraSmall ? (
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
      <Popover.Content side="right" offset={16} align="start" usePortal>
        <Elevator resting={4}>
          <Panel
            bordered
            radius={16}
            vibrant
            vibrancyColor="background"
          >
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
            <ReactEmojiPicker
              {...otherProps}
              lazyLoadEmojis
              theme={theme ?? Theme.AUTO}
              skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
              className={styles.Picker}
              emojiStyle={EmojiStyle.NATIVE}
              emojiVersion="15.0"
              autoFocusSearch={false}
              width={matches.extraSmall ? undefined : '100%'}
            />
          </Panel>
        </Elevator>
      </Popover.Content>
    </Popover>
  ) : (
    <Modal isOpen onClose={() => console.log('ciao')}>
      <Modal.Content title={useChip ? (
        <TextChip
          emoji={emoji}
          color={chipColor}
          dimension="regular"
          tinted={false}
        />
      ) : (
        <Emoji
          unified={emoji}
          size={sizes[dimension].emoji / 1.2}
        />
      )}
      >
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
        <ReactEmojiPicker
          {...otherProps}
          lazyLoadEmojis
          theme={theme ?? Theme.AUTO}
          skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
          className={styles.Picker}
          emojiStyle={EmojiStyle.NATIVE}
          emojiVersion="15.0"
          autoFocusSearch={false}
          width={matches.extraSmall ? undefined : '100%'}
        />
      </Modal.Content>
    </Modal>
  );
};

Picker.displayName = 'Picker';
