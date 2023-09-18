import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  CSSProperties, useMemo,
} from 'react';
import { FCChildrenClass } from 'src/types/custom';

import styles from './bleed.module.css';

export type BleedProps = {
  /**
   * Sets the amount of bleed on each inline side.
   */
  amount: string | Exclude<TokensTypes['space'], string>;

  /**
   * Set if the bleed should be full width.
   * @importatnt This will ignore the `amount` prop.
   */
  full?: boolean;
}

export const Bleed: FCChildrenClass<BleedProps> = ({
  className,
  children,
  style,
  full = false,
  amount = 16,
  ...otherProps
}) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      '--bleed': (typeof amount === 'string') ? amount : tkns.space[amount],
    }
  ), [amount]);

  return (
    <div
      className={clsx(styles.Bleed, className)}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      style={{ ...dynamicStyle, ...style }}
      data-bleed-full={full}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Bleed.displayName = 'Bleed';
