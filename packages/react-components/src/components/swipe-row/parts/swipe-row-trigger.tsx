import type { PanInfo } from 'motion/react';
import { animate, motion } from 'motion/react';
import type { FC, PropsWithChildren } from 'react';
import React, { useRef } from 'react';

import styles from '../swipe-row.module.css';
import { useSwipeRow } from './swipe-row-context';

type SwipeRowTriggerProps = {
  /**
   * The content of the trigger element
   * @internal
   * @private
   */
  children: React.ReactNode;
};

export const SwipeRowTrigger: FC<PropsWithChildren<SwipeRowTriggerProps>> = ({ children }) => {
  const { x, actionsWidth } = useSwipeRow();
  /**
   * Ref to determine if the action is a drag
   */
  const wasDraggedRef = useRef(false);

  /**
   * The onDragStart event is triggered only when a drag is initiated by motion `onDragStart` prop
   * This is the right time to set our flag.
   */
  const handleDragStart = () => {
    wasDraggedRef.current = true;
  };

  /**
   * Handles the end of a drag gesture and determines the resulting animation based on the drag offset and velocity.
   */
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    /**
     * Snap animation logic
     */
    const swipeThreshold = -actionsWidth / 2;
    const velocityThreshold = -500;

    if (offset.x < swipeThreshold || velocity.x < velocityThreshold) {
      animate(x, -actionsWidth, { type: 'spring', stiffness: 400, damping: 40 });
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
    }
  };

  const handleClickCapture = (event: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    /**
     * Set a threshold to determine if the swipe is considered "open" or "closed"
     */
    const isFullyOpen = Math.abs(x.get() + actionsWidth) < 1;

    /**
     * If the trigger is fully open, the first click closes it.
     */
    if (isFullyOpen) {
      event.stopPropagation();
      event.preventDefault();
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
      // Reset the flag for the next interaction
      wasDraggedRef.current = false;
      return;
    }

    // If it was a drag action, block the click
    if (wasDraggedRef.current) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handlePointerDown = () => {
    // At the beginning of each new interaction (press), we reset the flag.
    // If the user only clicks, the flag will remain false.
    // If the user starts dragging, onDragStart will set it to true.
    wasDraggedRef.current = false;
  };

  return (
    <motion.div
      className={styles.Trigger}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: -actionsWidth, right: 0 }}
      onPointerDown={handlePointerDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClickCapture={handleClickCapture}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  );
};
