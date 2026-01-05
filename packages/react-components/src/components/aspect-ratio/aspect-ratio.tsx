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

'use client';

import {
  Children, cloneElement, CSSProperties, FC, isValidElement,
} from 'react';

export type AspectRatioProps = {
  /**
   * The children to apply the aspect ratio to.
   */
  children: React.ReactNode;
  /**
   * Set the aspect ratio string to apply to the children.
   * The string format is `width / height`.
   * @example '16 / 9'
   */
  ratio: string;
}

export const AspectRatio: FC<AspectRatioProps> = ({
  children,
  ratio,

}) => Children.map(children, (child) => {
  if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
    return cloneElement(child, {
      style: {
        ...(child.props.style ?? {}),
        aspectRatio: ratio,
      },
    });
  }

  return undefined;
});

