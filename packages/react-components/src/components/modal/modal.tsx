'use client';

import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { LazyMotion, MotionProps, domMax, m } from 'motion/react';
import { forwardRef, useId, useMemo } from 'react';
import { FocusOn } from 'react-focus-on';

import { Overlay, type OverlayProps, useResponsiveContext } from '@/components';

import { ModalContent } from './content/modal-content';
import styles from './modal.module.css';

export type ModalProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * This enables the modal to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the modal.
   *
   * @defaultValue true
   */
  closeOnClickOutside?: boolean;
  /**
   * Enable or disable autofocus on the first focusable element inside the modal.
   *
   * @defaultValue true
   */
  autoFocus?: boolean;
  /**
   * Set the visibility of the modal.
   */
  isOpen?: boolean;
  /**
   * Set the z-index of the modal
   */
  index?: OverlayProps['index'];
  /**
   * Callback for closing the modal
   */
  onClose: NonNullable<OverlayProps['onClose']>;
};

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  // biome-ignore lint/style/useNamingConvention: This is not a prop but a nested component
  Content: typeof ModalContent;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      closeOnClickOutside = true,
      autoFocus = true,
      onClose,
      isOpen,
      index,
      onAnimationStart,
      onDragStart,
      onDragEnd,
      onDrag,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const headingId = useId();
    const { matches } = useResponsiveContext();

    const ModalAnimation = useMemo(
      () => ({
        visible: {
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            easing: tkns.easing.entrance,
            duration: Number.parseFloat((matches.small ? tkns.duration[100] : tkns.duration[300]).replace('s', '')),
          },
        },
        hidden: {
          scale: matches.small ? 0.98 : 1,
          opacity: matches.small ? 0 : 1,
          y: matches.small ? 0 : '100%',
          transition: {
            easing: tkns.easing.exit,
            duration: Number.parseFloat(tkns.duration[100].replace('s', '')),
          },
        },
      }),
      [matches],
    );

    return (
      <Overlay onClose={onClose} index={index}>
        {isOpen && (
          <FocusOn
            onClickOutside={closeOnClickOutside ? onClose : undefined}
            onEscapeKey={onClose}
            autoFocus={autoFocus}
          >
            <LazyMotion features={domMax}>
              <m.div
                variants={ModalAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
                // biome-ignore lint/a11y/useSemanticElements: TODO Refactor as dialog
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                className={clsx(styles.Modal, className)}
                ref={forwardedRef}
                {...otherProps}
              >
                {children}
              </m.div>
            </LazyMotion>
          </FocusOn>
        )}
      </Overlay>
    );
  },
) as ModalComponent;

Modal.Content = ModalContent;
