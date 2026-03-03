'use client';

import type { IconNames } from '@lualtek/icons';
import sprite from '@lualtek/icons/sprite';
import type { TokensTypes } from '@lualtek/tokens/web';
import clsx from 'clsx';
import type { FC, ReactElement } from 'react';
import { Children, cloneElement, useMemo } from 'react';

import styles from './icon.module.css';

export type IconProps = React.ComponentPropsWithRef<'svg'> & {
  /**
   * Set the icon name to display. Icon names are defined in
   * the `IconNames` enum and are part of Lualtek iconography system.
   */
  source: IconNames | ReactElement<HTMLOrSVGElement>;
  /**
   * Set the size of the icon. To improve readability at any size, the style of the icon
   * is automatically defined based on the dimension.
   *
   * @defaultValue 18
   */
  dimension?: TokensTypes['icon']['size'];
};

export const Icon: FC<IconProps> = ({ className, source, dimension = 18, fill, ref: forwardedRef, ...otherProps }) => {
  const dynamicStyle = useMemo(() => (Number(dimension) < 18 ? 'solid' : 'duotone'), [dimension]);

  return typeof source === 'string' ? (
    <svg
      aria-hidden="true"
      width={dimension}
      height={dimension}
      fill={fill}
      className={clsx(styles.Icon, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <use href={`${sprite}#${dynamicStyle}/${source}`} />
    </svg>
  ) : (
    <>
      {Children.map(source, (child) =>
        cloneElement(child as ReactElement<React.SVGProps<SVGSVGElement>>, {
          className,
          'aria-hidden': 'true',
          width: dimension,
          height: dimension,
        }),
      )}
    </>
  );
};
