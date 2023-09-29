'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  CSSProperties, forwardRef, ReactNode, useMemo,
} from 'react';

import {
  Polymorphic, Stack, StackProps, useStyles,
} from '@/components';

import styles from './card.module.css';

/**
 * @deprecated Use the `Panel`, `Stack` and `Elevator` components instead.
 */
export type CardProps = Pick<StackProps, 'wrap' | 'columnGap' | 'rowGap' | 'vAlign' | 'hAlign'> & {
  /**
   * Set the padding on each side of the card.
   * @defaultValue 24
   */
  padding?: false | TokensTypes['space'];
  /**
   * Content rendered inside the card on the left side, before children.
   */
  left?: ReactNode;
  /**
   * Content rendered inside the card on the right side, after children.
   */
  right?: ReactNode;
  /**
   * Add a border to the card to increase its visual weight and contrast.
   */
  bordered?: boolean;
  /**
   * Define the edge radius of the card.
   * @defaultValue 16
   */
  radius?: false | TokensTypes['radius'];
  /**
   * Change the background color of the card.
   */
  dimmed?: 0 | 1 | 2;
  /**
   * Make the card vibrant. Add tranlucent background.
   * @defaultValue false
   */
  vibrant?: boolean;
  /**
   * Change the background color of the card when it is hovered.
   * @defaultValue false
   */
  highlightOnHover?: boolean;
}

type PolymorphicCard = Polymorphic.ForwardRefComponent<'div', CardProps>;

export const Card = forwardRef(({
  as: Wrapper = 'div',
  children,
  className,
  padding = 24,
  radius = 16,
  left,
  right,
  dimmed,
  bordered,
  columnGap = 24,
  rowGap = 24,
  vAlign = 'start',
  hAlign = 'space-between',
  vibrant = false,
  highlightOnHover = false,
  wrap,
  style,
  ...otherProps
}, forwardedRef) => {
  const { vibrancy } = useStyles();

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--padding': padding && tkns.space[padding],
    '--radius': radius && tkns.radius[radius],
  }), [padding, radius]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Card, className)}
      style={{ ...dynamicStyle, ...style }}
      data-card-dimmed={dimmed}
      data-card-bordered={bordered}
      data-card-vibrant={vibrant}
      data-card-highlight-hover={highlightOnHover}
      {...vibrant ? vibrancy.attributes : undefined}
      {...otherProps}
    >
      <Stack
        direction="row"
        fill={false}
        vAlign={vAlign}
        hAlign={hAlign}
        columnGap={columnGap}
        rowGap={rowGap}
        wrap={wrap}
      >
        {left && <div className={styles.Left}>{left}</div>}

        {children && (
          <div className={styles.Content}>
            {children}
          </div>
        )}

        {right && (
          <div className={styles.Right}>
            {right}
          </div>
        )}
      </Stack>
    </Wrapper>
  );
}) as PolymorphicCard;

Card.displayName = 'Card';
