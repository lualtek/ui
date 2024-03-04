'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  Children, cloneElement,
  forwardRef, isValidElement, useMemo,
} from 'react';

import { Polymorphic } from '@/components';

import styles from './list.module.css';
import { ListItem, ListItemProps } from './list-item';

export type ListProps = {
  /**
   * Set the dimension of the items in the list.
   * This affects also the marker size.
   *
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set to show or hide the marker indicator beside each item in the list.
   *
   * @defaultValue false
   */
  hideMarker?: boolean;
  /**
   * Set the gap between each list item
   */
  gap?: TokensTypes['space'];
}

type PolymorphicList = Polymorphic.ForwardRefComponent<'ul', ListProps> & {
  Li: React.ForwardRefExoticComponent<ListItemProps>;
};

export const List = forwardRef(({
  as: Wrapper = 'ul',
  children,
  dimension = 'regular',
  className,
  hideMarker = false,
  gap,
  style,
  ...otherProps
}, forwardedRef) => {
  const isUnordered = useMemo(() => Wrapper === 'ul', [Wrapper]);

  const dynamicStyle = useMemo(() => (
    {
      '--gap': gap ? tkns.space[gap] : 0,
    }
  ), [gap]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.List, className)}
      data-list-size={dimension}
      data-list-ordered={!isUnordered}
      data-list-no-marker={hideMarker}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {Children.map(children, child => isValidElement<ListItemProps>(child) && cloneElement(
        child,
        {
          hideMarker: !isUnordered || hideMarker,
          dimension,
        },
      ))}
    </Wrapper>
  );
}) as PolymorphicList;

List.Li = ListItem;

List.displayName = 'List';
