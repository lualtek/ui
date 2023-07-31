'use client';

import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import { forwardRef, useMemo } from 'react';
import { FocusOn } from 'react-focus-on';

import { PropsClassChildren, useOverlayContext, useResponsiveContext } from '@/components';

import { ModalContent, ModalContentProps } from './content/modal-content';
import styles from './modal.module.css';

export type ModalProps = PropsClassChildren<{
  /**
   * This enable the modal to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the modal.
   */
  closeOnClickOutside?: boolean;
  /**
   * Enable or disable autofocus on the first focusable element inside the modal.
   */
  autoFocus?: boolean;
}>

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  Content: React.ForwardRefExoticComponent<ModalContentProps>;
}

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  className,
  closeOnClickOutside = true,
  autoFocus = true,
  ...otherProps
}, forwardedRef) => {
  const { titleId, onClose } = useOverlayContext();
  const { matches } = useResponsiveContext();

  const ModalAnimation = useMemo(() => ({
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        ease: cssEasingToArray(tkns.easing.entrance),
        duration: parseFloat(tkns.duration[300].replace('s', '')),
      },
    },
    hidden: {
      scale: matches.small ? 0.98 : 1,
      opacity: matches.small ? 0 : 1,
      y: matches.small ? 0 : '100%',
      transition: {
        ease: cssEasingToArray(tkns.easing.exit),
      },
    },
  }), [matches]);

  return (
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
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={clsx(styles.Modal, className)}
          ref={forwardedRef}
          {...otherProps}
        >
          {children}
        </m.div>
      </LazyMotion>
    </FocusOn>
  );
}) as ModalComponent;

Modal.displayName = 'Modal';
Modal.Content = ModalContent;
