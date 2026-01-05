/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import React, {
  ComponentPropsWithRef, FC, useEffect, useState,
} from 'react';

export type TextLoadingProps = ComponentPropsWithRef<'div'> & {
  /**
   * A variable representing an optional single character or string value.
   * The value can be a single character, a string, or undefined if not set.
   *
   * @defaultValue '…'
   */
  char?: string;
  /**
   * Specifies the interval in milliseconds.
   * This value determines the frequency at which a specific operation or event is executed.
   * If not provided, the default interval may vary based on implementation.
   *
   * @defaultValue 400
   */
  interval?: number;
};

export const TextLoading: FC<TextLoadingProps> = ({
  char = '…',
  interval = 400,
}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => (c % 3) + 1);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return <>{char.repeat(count)}</>;
};
