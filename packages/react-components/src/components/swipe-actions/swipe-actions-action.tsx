import { motion, useTransform } from 'motion/react';
import React, { FC, ReactNode } from 'react';

import styles from './swipe-actions.module.css';
import { useSwipeActions } from './swipe-actions-context';

export interface ActionProps {
  color: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  index?: number;
}

/**
 * Represents a functional component for an interactive action button in a swipe-enabled UI.
 *
 * This component is built to be used within swipeable actions. It renders a button with optional
 * icon, label, and hover effects while also managing click events and swipe actions.
 *
 */
export const Action: FC<ActionProps> = ({
  color,
  icon,
  label,
  onClick,
  index = 0,
}) => {
  const {
    x, actionsWidth, actionCount, closeActions,
  } = useSwipeActions();

  const actionWidth = actionCount > 0 ? actionsWidth / actionCount : 0;

  const startAnimate = -(index * actionWidth);
  const endAnimate = -((index + 1) * actionWidth);

  const scale = useTransform(
    x,
    [startAnimate, endAnimate],
    [0, 1],
    { clamp: true },
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
      aria-label={label}
      style={{
        scale,
      }}
    >
      <span className={styles.ActionIcon}>{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
};

Action.displayName = 'Action';
