'use client';

import clsx from 'clsx';
import {
  CSSProperties, forwardRef, ReactNode, useMemo,
} from 'react';
import { AutoFocusInside } from 'react-focus-on';

import {
  Elevator, IconButton, Stack, Title, useOverlayContext, useResponsiveContext,
} from '@/components';
import { PropsClassChildren } from '@/components/types';

import styles from './modal-content.module.css';

export type ModalContentProps = PropsClassChildren<{
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
}>

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
      <div
        className={clsx(styles.Content, className)}
        style={{ ...dynamicStyle, ...style }}
        ref={forwardedRef}
        data-theme={theme}
        data-modal-content-scroll={scrollInside}
        {...otherProps}
      >
        <Stack vAlign="center" fill={false} hAlign="space-between" direction="row" className={styles.Header}>
          <Title responsive={false} level="5" id={titleId}>{title}</Title>
          {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="remove" kind="flat" />}
        </Stack>
        <AutoFocusInside>
          {children}
        </AutoFocusInside>
      </div>
    </Elevator>
  );
});

ModalContent.displayName = 'Modal.Content';
