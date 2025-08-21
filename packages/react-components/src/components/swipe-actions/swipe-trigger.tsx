import type { PanInfo } from 'motion/react';
import { animate, motion } from 'motion/react';
import React, { FC, PropsWithChildren } from 'react';

import styles from './swipe-actions.module.css';
import { useSwipeActions } from './swipe-actions-context';

export type TriggerProps = {
  children: React.ReactNode;
};

export const SwipeTrigger: FC<PropsWithChildren<TriggerProps>> = ({ children }) => {
  const { x, actionsWidth } = useSwipeActions();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = -actionsWidth / 2;
    const velocityThreshold = -500;

    if (offset.x < swipeThreshold || velocity.x < velocityThreshold) {
      animate(x, -actionsWidth, { type: 'spring', stiffness: 400, damping: 40 });
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
    }
  };

  return (
    <motion.div
      className={styles.Trigger}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: -actionsWidth, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  );
};
