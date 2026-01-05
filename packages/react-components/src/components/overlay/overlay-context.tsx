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
  createContext, PropsWithChildren, useContext, useId,
} from 'react';

import { OverlayProps } from './overlay';

type OverlayContextProps = Pick<OverlayProps, 'onClose'> & {
  /**
   * The id of the title element of the overlay. This value is automatically generated.
   * @internal
   * @defaultValue ""
   */
  headingId?: string;
}

export const OverlayContext = createContext<OverlayContextProps>({
  headingId: '',
});

export const OverlayProvider = (props: PropsWithChildren<OverlayContextProps>) => {
  const uid = useId();
  const {
    children,
    headingId = `${uid}-overlay-title`, onClose,
  } = props;

  return (
    <OverlayContext.Provider value={{
      headingId,
      onClose,
    }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);

  if (!context) {
    console.warn('useOverlayContext: Missing OverlayContext. Please wrap your component in an OverlayProvider.');
  }

  return context;
};
