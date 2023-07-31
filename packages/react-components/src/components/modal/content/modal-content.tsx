'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  CSSProperties, forwardRef, ReactNode, useMemo,
} from 'react';
import { AutoFocusInside } from 'react-focus-on';

import {
  Elevator, IconButton, Stack, Title, useOverlayContext, useResponsiveContext,
} from '@/components';

import styles from './modal-content.module.css';

export type ModalContentProps = ComponentPropsWithRef<'div'> & {
  /**
   * Set the accessible title of the modal. This is used by screen readers to
   * announce the title of the modal when opened.
   */
  title: ReactNode;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
  /**
   * Set the background color for the content header
   */
  headerTint?: string;
  /**
   * Enable or disable content scrolling. This is used when you want to create a scrollable element inside
   * and prevend double scrolling.
   */
  scrollInside?: boolean;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className,
  title,
  theme = 'auto',
  scrollInside = true,
  headerTint,
  style,
  ...otherProps
}, forwardedRef) => {
  const { onClose, titleId } = useOverlayContext();
  const { matches } = useResponsiveContext();

  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--header-tint': headerTint,
    }
  ), [headerTint]);

  return (
    <Elevator resting={4} direction={matches.small ? 'bottom' : 'top'}>
      <Stack
        className={clsx(styles.Content, className)}
        style={{ ...dynamicStyle, ...style }}
        ref={forwardedRef}
        data-theme={theme}
        {...otherProps}
      >
        <Stack vAlign="center" fill={false} hAlign="space-between" direction="row" className={styles.Header}>
          <Title lineHeight="small" responsive={false} level="5" id={titleId}>{title}</Title>
          {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="remove" kind="flat" />}
        </Stack>
        <div className={styles.Scroller} data-modal-content-scroll={scrollInside}>
          <AutoFocusInside>
            {children}
          </AutoFocusInside>
        </div>
      </Stack>
    </Elevator>
  );
});

ModalContent.displayName = 'Modal.Content';
