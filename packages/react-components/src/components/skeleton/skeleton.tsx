'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import {
  FC,
  Fragment, useCallback, useId,
  useMemo,
} from 'react';

import styles from './skeleton.module.css';

export type SkeletonProps = React.ComponentPropsWithRef<'span'> & {
  /**
   * Set the edge radius of each skeleton block.
   * This value must be one of the available `radius` tokens
   *
   * @defaultValue 4
   */
  radius?: TokensTypes['radius'];
  /**
   * Set the block to be a circle, ignoring the `radius` property.
   * If children are provided, this value is ignored.
   */
  circle?: boolean;
  /**
   * Set how many skeleton blocks to display.
   * If children are provided, this value is ignored.
   *
   * @defaultValue 1
   */
  count?: number;
  /**
   * Set the width of each skeleton block.
   */
  width?: string | number;
  /**
   * Set the height of each skeleton block.
   * If children are provided, this value is ignored.
   */
  height?: string | number;
  /**
   * Renders every block on their own line or in a single line.
   * Note: By default, if a width is not specified, every items will fill the available space
   * If children are provided, this value is ignored.
   */
  inline?: boolean;
  /**
   * Enable the shim animation and the announcement of the loading state.
   *
   * @defaultValue true
   */
  enableAnimation?: boolean;
  /**
   * Set the gap between stacked skeleton items.
   * If children are provided, this value is ignored.
   */
  gap?: TokensTypes['space'];
  /**
   * Enable or disable the loading state.
   */
  loading?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({
  className,
  children,
  radius = 4,
  style,
  width,
  height,
  count = 1,
  gap,
  enableAnimation = true,
  inline,
  circle,
  loading,
  ...otherProps
}) => {
  const uid = useId();
  const computedWidth = useMemo(() => (typeof width === 'number' ? `${width}px` : width), [width]);
  const computedHeight = useMemo(() => (typeof height === 'number' ? `${height}px` : height), [height]);

  const dynamicStyle = useMemo(() => ({
    '--radius': radius && tkns.radius[radius],
    '--width': width && computedWidth,
    '--height': height && computedHeight,
    '--gap': gap ? tkns.space[gap] : undefined,
  }), [radius, width, computedWidth, height, computedHeight, gap]);

  const SkeletonItem = useCallback(() => (
    <span
      className={styles.SkeletonItem}
      data-skeleton-circle={circle}
      data-skeleton-animated={enableAnimation}
      style={{ ...dynamicStyle, ...style }}
    >
      &zwnj;
    </span>
  ), [circle, enableAnimation, dynamicStyle, style]);

  return (
    <span
      className={className}
      aria-live="polite"
      aria-busy={enableAnimation}
      {...otherProps}
    >
      {!children
        ? Array.from(Array(count).keys()).map(n => (inline
          ? <SkeletonItem key={`${uid}-${n}`} />
          : (
            <Fragment key={`${uid}-${n}`}>
              <SkeletonItem />
              <br />
            </Fragment>
          )
        ))
        /**
         * If children are provided we hide them and show the skeleton instead
         * while the loading state is active
         */
        : (
          <>
            {loading ? (
              <div
                className={styles.SkeletonItem}
                data-skeleton-circle={circle}
                data-skeleton-animated={enableAnimation}
                data-skeleton-children={Boolean(children)}
                data-skeleton-inline={inline}
                style={{ ...dynamicStyle, ...style }}
              >
                {children}
              </div>
            ) : children}
          </>
        )
      }
    </span>
  );
};
