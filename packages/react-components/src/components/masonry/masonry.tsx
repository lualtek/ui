
import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement, useMemo,
} from 'react';
import MasonryLayout from 'react-masonry-css';
import { FCChildrenClass } from 'src/types/custom';

import styles from './masonry.module.css';

type Columns = {
  default: number;
  extraSmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  extraLarge?: number;
}

export type MasonryProps = {
  /**
   * Set the space between items. This is applied on both vertical
   * and horizontal axis.
   */
  gap?: TokensTypes['space'];
  /**
   * Set the breakpoints for the masonry layout. You can pass a fixed number
   * or an object map.
   *
   * The object map is used to change the number of the columns based on
   * the specified breakpoint. When passing an object, you must specify the
   * default key, other breakpoints are optional.
   *
   * @example
   *{
   *  default: 6,
   *  extraLarge: 5,
   *  large: 4,
   *  medium: 3,
   *  small: 2,
   *  extraSmall: 1
   *}
   */
  columns?: number | Columns;
}

const breakpoints: Record<string, number> = {
  'extra-small': 480,
  small: 768,
  medium: 960,
  large: 1280,
  'extra-large': 1600,
};

export const Masonry: FCChildrenClass<MasonryProps> = ({
  className,
  children,
  columns = 3,
  gap,
  style,
  ...otherProps
}) => {
  const computedStyle: CSSProperties = useMemo(() => (
    {
      '--gap': gap ? tkns.space[gap as keyof typeof tkns.space] : 0,
    }
  ), [gap]);

  const computedColumnsGiuste = useMemo(() => (typeof columns === 'object' ? Object.keys(columns).reduce(
    (acc, current) => {
      if (current === 'default') {
        return acc;
      }

      const breakpoint = breakpoints[current as keyof Columns];
      const column = columns[current as keyof Columns];

      return ({
        ...acc,
        [breakpoint]: column,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: columns.default,
      });
    }, {
      default: 0,
    },
  ) : undefined), [columns]);

  return (
    <MasonryLayout
      role="list"
      className={clsx(styles.Masonry, className)}
      columnClassName={styles.Column}
      breakpointCols={typeof columns === 'number' ? columns : computedColumnsGiuste}
      style={{ ...computedStyle, ...style } as CSSProperties}
      {...otherProps}
    >
      {Children.map(children, child => isValidElement(child) && cloneElement(
        child as ReactElement,
        {
          role: 'listitem',
        },
      ))}
    </MasonryLayout>
  );
};
