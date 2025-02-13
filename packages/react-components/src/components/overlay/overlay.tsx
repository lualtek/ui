'use client';

import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'motion/react';
import {
  FC,
  ReactNode, useEffect, useId, useMemo,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './overlay.module.css';
import { OverlayProvider } from './overlay-context';

export type OverlayProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * The children to render inside the overlay. This content
   * will be rendered in a React `portal`, which means that it will be
   * rendered outside the DOM hierarchy of the parent component.
   */
  children: ReactNode;
  isVisible?: boolean;
  /**
   * Set the root element to render the overlay into.
   */
  root?: HTMLElement;
  /**
   * Set the css `z-index` of the overlay. This must be used only
   * if necessary.
   *
   * @defaultValue 4
   */
  index?: 'auto' | number;
  /**
   * Set the overlay style. This is used to obscure the content
   * behind the overlay if `obfuscate` is `true`. If set to `auto`, the overlay
   * color is determined by the global active theme (light or dark).
   *
   * @defaultValue "auto"
   */
  theme?: 'light' | 'dark' | 'auto';
  /**
   * The callback function that is called when the overlay is closed.
   */
  onClose?: () => void;
  /**
   * Set the overlay to be obscuring the page content behind it.
   *
   * @defaultValue true
   */
  obfuscate?: boolean;
  /**
   * Set the opacity of the backdrop.
   * @defaultValue 0.7
   */
  backdropOpacity?: number;
}

export const Overlay: FC<OverlayProps> = ({
  children,
  root,
  isVisible,
  theme = 'auto',
  index = 'auto',
  obfuscate = true,
  backdropOpacity = 0.7,
  onClose,
}) => {
  const uid = useId();
  const defaultRoot = useMemo(() => (root ?? (typeof document !== 'undefined' ? document.body : null)), [root]);

  useEffect(() => {
    if (defaultRoot?.closest('[data-overlay]')) {
      throw new Error(`
        Overlay: An Overlay must not be inside another container.
        Please change the root prop.
      `);
    }
  }, [defaultRoot]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isVisible) {
        document.body?.setAttribute('data-overlay-open', 'true');
        document.body?.style.setProperty('--overlay-z-index', String(index));
      } else {
        document.body?.style.removeProperty('--overlay-z-index');
        document.body?.removeAttribute('data-overlay-open');
      }
    }
  }, [isVisible, defaultRoot, index]);

  const content = (
    <OverlayProvider onClose={onClose}>
      <LazyMotion features={domMax} strict>
        {isVisible && (
          <div
            data-overlay
            data-overlay-obfuscate={obfuscate}
            className={styles.Overlay}
            style={{ zIndex: index }}
            key="lualtek-overlay"
          >
            {obfuscate && (
              <m.span
                key={`${uid}-modal-backdrop`}
                className={styles.Backdrop}
                data-overlay-color={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: backdropOpacity }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              />
            )}
            {children}
          </div>
        )}
      </LazyMotion>
    </OverlayProvider>
  );

  return defaultRoot && createPortal(content, defaultRoot);
};
