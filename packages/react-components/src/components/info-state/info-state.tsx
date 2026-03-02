'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import { domMax, LazyMotion, m } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import type { IconChipProps, StackProps, TitleProps } from '@/components';
import { IconChip, Stack, Text, Title } from '@/components';

import styles from './info-state.module.css';

export type InfoStateProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set the main tagline of the info state. This should be catchy and short
   * as much as possible.
   */
  title: ReactNode;
  /**
   * Set the maximum width of the title. This is used to wrap the title if it's too long
   *
   * @defaultValue "20ch"
   */
  titleMaxWidth?: string;
  /**
   * Set the maximum width of the text. This is used to wrap the text
   *
   * @defaultValue "60ch"
   */
  textMaxWidth?: string;
  /**
   * The icon to display. This is used to enforce the message of the info state.
   * This is not displayed if `image` is set.
   */
  icon?: IconChipProps['icon'];
  /**
   * Set the icon color. Please use the correct color based on the type of the message.
   * Eg. Don't use `green` for negative informations.
   *
   * @defaultValue "blue"
   */
  iconColor?: TokensTypes['colors'];
  /**
   * An image may be used instead of an icon. The image is centered and scaled.
   */
  image?: string;
  /**
   * Set the direction of the content (column or row).
   *
   * @defaultValue "column"
   */
  direction?: StackProps['direction'];
  /**
   * Pass the suplementary actions to the info state. Even if you can pass
   * as many elements as you want, we suggest to add no more than two actions.
   */
  actions?: ReactNode;
  /**
   * Set the title level. This is used to set the title size.
   *
   * @defaultValue '4'
   */
  titleSize?: TitleProps['level'];
};

export const InfoState: FC<InfoStateProps> = ({
  className,
  style,
  children,
  title,
  titleMaxWidth = '20ch',
  textMaxWidth = '60ch',
  icon,
  image,
  direction = 'column',
  iconColor = 'blue',
  actions,
  titleSize = '4',
  ref: forwardedRef,
  ...otherProps
}) => {
  const isHorizontal = direction === 'row';

  const dynamicStyle = useMemo(
    () => ({
      '--icon-color': `var(--highlight-${iconColor}-background)`,
    }),
    [iconColor],
  );

  return (
    <Stack
      ref={forwardedRef}
      direction={direction}
      rowGap={24}
      columnGap={32}
      className={className}
      hAlign={isHorizontal ? 'start' : 'center'}
      vAlign={isHorizontal && image ? 'center' : 'start'}
      fill={false}
      wrap={!!image}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        {!image && icon && (
          <m.span
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 5.2,
              repeatType: 'reverse',
              type: 'spring',
            }}
          >
            <IconChip icon={icon} dimension="big" color={iconColor} className={styles.IconWrapper} />
          </m.span>
        )}

        {image && !icon && (
          <img className={styles.Image} alt="" width="400" src={image} loading="lazy" decoding="async" />
        )}

        <Stack rowGap={16} hAlign={isHorizontal ? 'start' : 'center'} vAlign="center" fill={false}>
          <Title maxWidth={titleMaxWidth} align={isHorizontal ? 'start' : 'center'} level={titleSize}>
            {title}
          </Title>
          <Text as="div" maxWidth={textMaxWidth} dimmed={6} align={isHorizontal ? 'start' : 'center'}>
            {children}
          </Text>
          {actions && (
            <Stack vPadding={16} inline direction="row" columnGap={16} rowGap={16} wrap>
              {actions}
            </Stack>
          )}
        </Stack>
      </LazyMotion>
    </Stack>
  );
};
