'use client';

import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  forwardRef, ReactNode, useId,
  useMemo,
} from 'react';
import { AutoFocusInside, FocusOn } from 'react-focus-on';
import { useKeys } from 'rooks';

import {
  Elevator,
  IconButton, Overlay, OverlayProps,
  Panel,
  PropsClassChildren,
  Stack,
  Title,
  useResponsiveContext,
} from '@/components';

import styles from './drawer.module.css';

export type DrawerProps = PropsClassChildren<{
  /**
   * This enables the drawer to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the drawer.
   *
   * This property is considered only when `isModal` is `true`.
   * @defaultValue true
   */
  closeOnClickOutside?: boolean;
  /**
   * Set the accessible title of the drawer. This is used by screen readers to
   * announce the title of the drawer when opened.
   */
  title?: ReactNode;
  /**
   * Hide or show the drawer header which includes the title and the close button.
   * If you hide the title, make sure to add yuor own title element in order
   * to provide an accessible label to the drawer.
   *
   * @defaultValue true
   */
  showHeader?: boolean;
  /**
   * Set the maximum width of the drawer, on mobile the drawer will be
   * automatically collapsed when the width is reached.
   *
   * @defaultValue "400px"
   */
  maxWidth?: string;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   *
   * @defaultValue "auto"
   */
  theme?: 'dark' | 'light' | 'auto';
  /**
   * Set the side on which the drawer will be positioned.
   *
   * @defaultValue "right"
   */
  side?: 'left' | 'right';
  /**
   * Disable the modal behavior of the drawer.
   * If `false`, disable the prop `closeOnClickOutside` and
   * the page is not blocked when the drawer is open.
   *
   * @defaultValue true
   */
  isModal?: boolean;
  /**
   * Enable or disable autofocus on the first focusable element inside the drawer.
   *
   * @defaultValue true
   */
  autoFocus?: boolean;
  /**
   * Set the visibility of the drawer.
   */
  isOpen?: boolean;
  /**
   * Set the z-index of the drawer
   */
  index?: OverlayProps['index'];
  /**
   * Enable or disable safe padding. Prevents content from being hidden behind the safe area.
   *
   * @defaultValue true
   */
  safePadding?: boolean;
  /**
   * Callback for closing the drawer
   */
  onClose: NonNullable<OverlayProps['onClose']>;

  /**
   * Ref to the drawer content
   *
   */
  scrollerRef?: React.RefObject<HTMLDivElement>;
}>

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  children,
  className,
  closeOnClickOutside = true,
  showHeader = true,
  maxWidth = '400px',
  side = 'right',
  theme = 'auto',
  isModal = true,
  autoFocus = true,
  safePadding = true,
  title,
  onClose,
  isOpen,
  index,
  scrollerRef,
  ...otherProps
}, forwardedRef) => {
  const titleId = useId();
  const { matches } = useResponsiveContext();
  useKeys(['esc'], () => onClose());

  const dynamicStyle = useMemo(() => (
    {
      '--max-w': maxWidth,
    }
  ), [maxWidth]);

  const DrawerAnimation = {
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: tkns.duration[500],
      },
    },
    hidden: {
      x: side === 'right' ? '100%' : '-100%',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: tkns.duration[500],
      },
    },
  };

  return (
    <Overlay obfuscate={isModal} onClose={onClose} index={index}>
      {isOpen && (
        <div
          role="dialog"
          aria-modal={isModal}
          data-theme={theme}
          aria-labelledby={titleId}
          className={clsx(styles.Drawer, className)}
          ref={forwardedRef}
          {...otherProps}
        >
          <FocusOn
            enabled={isModal}
            onClickOutside={closeOnClickOutside ? onClose : undefined}
            onEscapeKey={onClose}
            autoFocus={autoFocus}
          >
            <LazyMotion features={domMax}>
              <m.div
                variants={DrawerAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={styles.Container}
                data-drawer-side={side}
              >
                <Elevator resting={4} direction={side === 'left' ? 'right' : 'left'}>
                  <Panel
                    vibrant
                    vibrancyColor="soft"
                    showGlow={matches.small}
                    bordered
                    borderSide={side === 'left' ? 'right' : 'left'}
                  >
                    <Stack
                      className={styles.Content}
                      style={dynamicStyle}
                      fill={false}
                      vAlign="start"
                      ref={forwardedRef}
                      data-drawer-content-safe-padding={safePadding}
                      {...otherProps}
                    >
                      {(showHeader && title) && (
                        <Stack
                          vAlign="center"
                          hAlign="space-between"
                          direction="row"
                          className={styles.Header}
                          columnGap={24}
                        >
                          <Title responsive={false} level="5" id={titleId} lineHeight="small">{title}</Title>
                          {onClose && (
                            <IconButton
                              onClick={onClose}
                              className={styles.CloseButton}
                              icon="remove"
                              kind="flat"
                            />
                          )}
                        </Stack>
                      )}
                      <div className={styles.Scroller} ref={scrollerRef}>
                        <AutoFocusInside>
                          {children}
                        </AutoFocusInside>
                      </div>
                    </Stack>
                  </Panel>
                </Elevator>
              </m.div>
            </LazyMotion>
          </FocusOn>
        </div>
      )}
    </Overlay>
  );
});

Drawer.displayName = 'Drawer';
