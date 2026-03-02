'use client';

import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import { Skeleton } from '@/components';

import styles from './avatar.module.css';

export type AvatarProps = React.ComponentPropsWithRef<'img'> & {
  /**
   * The source of the image to use as avatar
   */
  src?: string;
  /**
   * Define the size of the avatar
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
};

type SkeletonSizeType = Record<NonNullable<AvatarProps['dimension']>, Exclude<TokensTypes['space'], string>>;

const SkeletonSize: SkeletonSizeType = {
  small: 24,
  regular: 40,
  big: 56,
};

export const Avatar: FC<AvatarProps> = ({
  className,
  src,
  dimension = 'regular',
  ref: forwardedRef,
  ...otherProps
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <picture className={clsx(styles.Avatar, className)} data-loading={isLoading} data-avatar-dimension={dimension}>
      {!src && (
        <svg
          aria-hidden="true"
          className={styles.Placeholder}
          height={18}
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity={0.7}
            d="M6 0C3.795 0 2 1.794 2 4s1.795 4 4 4 4-1.794 4-4-1.795-4-4-4z"
            fill="var(--highlight-brand-foreground)"
          />
          <path
            d="M8.4 9H3.6C1.612 9 0 10.575 0
        12.531v5.126C1.814 18.517 3.85 19 6
        19s4.186-.483 6-1.343v-5.126C12 10.581 10.394 9 8.4 9z"
            fill="var(--highlight-brand-foreground)"
          />
        </svg>
      )}

      {src && isLoading && (
        <Skeleton
          width={tkns.space[SkeletonSize[dimension]]}
          height={tkns.space[SkeletonSize[dimension]]}
          style={{ position: 'absolute', inset: 0 }}
        />
      )}

      {src && (
        <img
          ref={forwardedRef}
          draggable={false}
          hidden={isLoading}
          onLoad={() => setIsLoading(false)}
          alt=""
          src={src}
          {...otherProps}
        />
      )}
    </picture>
  );
};
