'use client';

import clsx from 'clsx';
import {
  forwardRef, ReactNode, useMemo,
} from 'react';
import { AutoFocusInside } from 'react-focus-on';

import {
  Elevator, IconButton, Panel, Stack, Title, useOverlayContext, useResponsiveContext,
} from '@/components';

import styles from './modal-content.module.css';

export type ModalContentProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set the accessible title of the modal. This is used by screen readers to
   * announce the title of the modal when opened.
   */
  heading: ReactNode;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   *
   * @defaultValue "auto"
   */
  theme?: 'dark' | 'light' | 'auto';
  /**
   * Set the background color for the content header
   */
  headerTint?: string;
  /**
   * Enable or disable content scrolling. This is used when you want to create a scrollable element inside
   * and prevend double scrolling.
   *
   * @defaultValue true
   */
  scrollInside?: boolean;
  /**
   * Enable or disable safe padding. Prevents content from being hidden behind the safe area.
   *
   * @defaultValue true
   */
  safePadding?: boolean;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className,
  heading,
  theme = 'auto',
  scrollInside = true,
  headerTint,
  safePadding = true,
  style,
  ...otherProps
}, forwardedRef) => {
  const { onClose, headingId } = useOverlayContext();
  const { matches } = useResponsiveContext();

  const dynamicStyle = useMemo(() => (
    {
      '--header-tint': headerTint,
    }
  ), [headerTint]);

  return (
    <Elevator resting={4} direction={matches.small ? 'bottom' : 'top'}>
      <Panel
        className={clsx(styles.Content, className)}
        vibrant
        vibrancyColor="soft"
        bordered
        showGlow={matches.small}
        radius={matches.small ? 24 : [24, 24, 0, 0]}
        borderSide={matches.small ? 'all' : 'top'}
      >
        <Stack
          style={{ ...dynamicStyle, ...style }}
          className={styles.ContentLayout}
          data-modal-content-safe-padding={safePadding}
          ref={forwardedRef}
          data-theme={theme}
          {...otherProps}
        >
          <Stack vAlign="center" fill={false} hAlign="space-between" direction="row" className={styles.Header}>
            <Title lineHeight="small" responsive={false} level="5" id={headingId}>{heading}</Title>
            {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="remove" kind="flat" />}
          </Stack>
          <div className={styles.Scroller} data-modal-content-scroll={scrollInside}>
            <AutoFocusInside>
              {children}
            </AutoFocusInside>
          </div>
        </Stack>
      </Panel>
    </Elevator>
  );
});
