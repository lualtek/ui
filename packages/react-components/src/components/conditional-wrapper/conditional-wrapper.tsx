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

import { FC, ReactNode } from 'react';

export type ConditionalWrapperProps = {
  /**
   * The condition to determine whether to wrap the children.
   */
  condition: boolean;
  /**
   * The wrapper function to wrap the children.
   */
  wrapper: (children: ReactNode) => ReactNode;
  /**
   * The children to wrap.
   */
  children: ReactNode;
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = async ({
  children,
  condition,
  wrapper = children => <>{children}</>,
}) => (condition ? wrapper(children) : children);

