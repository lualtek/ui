import { motion, useTransform } from 'motion/react';
import React, { FC, ReactNode } from 'react';

import styles from './swipe-actions.module.css';
import { useSwipeActions } from './swipe-actions-context';

export interface ActionProps {
  color: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export const Action: FC<ActionProps> = ({
  color, icon, label, onClick,
}) => {
  const { x, actionsWidth, closeActions } = useSwipeActions();

  const scale = useTransform(
    x,
    [0, -actionsWidth],
    [0.5, 1],
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    closeActions();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={styles.Action}
      style={{
        // backgroundColor: color,
        scale,
      }}
      aria-label={label}
    >
      <span className={styles.ActionIcon}>{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
};

Action.displayName = 'Action';
