'use client';

import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'motion/react';
import {
  forwardRef, useId, useMemo,
} from 'react';
import { FocusOn } from 'react-focus-on';

import {
  Overlay,
  OverlayProps, useResponsiveContext,
} from '@/components';

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
}

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  Content: typeof ModalContent;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
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
}, forwardedRef) => {
  const headingId = useId();
  const { matches } = useResponsiveContext();

  const ModalAnimation = useMemo(() => ({
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        easing: tkns.easing.entrance,
        duration: parseFloat((matches.small ? tkns.duration[100] : tkns.duration[300]).replace('s', '')),
      },
    },
    hidden: {
      scale: matches.small ? 0.98 : 1,
      opacity: matches.small ? 0 : 1,
      y: matches.small ? 0 : '100%',
      transition: {
        easing: tkns.easing.exit,
        duration: parseFloat(tkns.duration[100].replace('s', '')),
      },
    },
  }), [matches]);

  return (
    <LazyMotion features={domMax} strict>
      <Overlay isVisible={isOpen} onClose={onClose} index={index}>
        <FocusOn
          onClickOutside={closeOnClickOutside ? onClose : undefined}
          onEscapeKey={onClose}
          enabled={isOpen}
          autoFocus={autoFocus}
        >
          <AnimatePresence mode="wait">
            {isOpen && (
              <m.div
                variants={ModalAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                className={clsx(styles.Modal, className)}
                ref={forwardedRef}
                {...otherProps}
              >
                {children}
              </m.div>
            )}
          </AnimatePresence>
        </FocusOn>
      </Overlay>
    </LazyMotion>
  );
}) as ModalComponent;

Modal.Content = ModalContent;
