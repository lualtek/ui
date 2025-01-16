'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  Children, cloneElement,
  forwardRef, isValidElement, useMemo,
} from 'react';

import { PolymorphicPropsRef, PropsClassChildren } from '@/components';

import styles from './list.module.css';
import { Li, ListItemProps } from './list-item';

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

type PolymorphicListProps<T extends React.ElementType = 'ul'> = PolymorphicPropsRef<T, PropsClassChildren<ListProps>>;

type ListComponent = (<T extends React.ElementType = 'ul'>(
  props: PolymorphicListProps<T>
) => JSX.Element | React.ReactNode | null) & {
  Li: typeof Li;
}

export const List = forwardRef(
  <T extends React.ElementType = 'ul'>(
    {
      as,
      children,
      dimension = 'regular',
      className,
      hideMarker = false,
      gap,
      style,
      ...otherProps
    }: PolymorphicListProps<T>,
    forwardedRef?: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'ul';
    const isUnordered = useMemo(() => Component === 'ul', [Component]);

    const dynamicStyle = useMemo(() => (
      {
        '--gap': gap ? tkns.space[gap] : 0,
      }
    ), [gap]);

    return (
      <Component
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
      </Component>
    );
  },
) as unknown as ListComponent;

List.Li = Li;
