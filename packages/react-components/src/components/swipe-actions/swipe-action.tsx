import { IconNames } from '@lualtek/icons';
import { TokensTypes } from '@lualtek/tokens/platforms/web';
import { motion, useTransform } from 'motion/react';
import React, { FC, ReactNode } from 'react';

import { BlankButton } from '../blank-button';
import { Icon } from '../icon';
import { IconChip } from '../icon-chip';
import { Panel } from '../panel';
import { Stack } from '../stack';
import { Text } from '../text';
import styles from './swipe-actions.module.css';
import { useSwipeActions } from './swipe-actions-context';

export interface ActionProps {
  /**
   * Set the action color
   *
   * @defaultValue undefined
   */
  color?: TokensTypes['colors'];
  /**
   * Set the action icon
   *
   * @defaultValue "c-info"
   */
  icon: IconNames;
  /**
   * Show the action label
   */
  showLabel?: boolean;
  /**
   * Set the action label. Must be short and concise.
   * Label is mandatory to describe the action. Use `showLabel` to hide the label.
   */
  label: string;
  /**
   * Callback function triggered when a click event occurs.
   * This function can be used to define custom behavior upon a click interaction.
   */
  onClick?: () => void;
  /**
   * The index of the action within the swipe actions.
   * @internal
   * @private
   */
  index?: number;
}

/**
 * Represents a functional component for an interactive action button in a swipe-enabled UI.
 *
 * This component is built to be used within swipeable actions. It renders a button with optional
 * icon, label, and hover effects while also managing click events and swipe actions.
 *
 */
export const SwipeAction: FC<ActionProps> = ({
  color,
  icon = 'c-info',
  showLabel = true,
  label = 'My Action',
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
    <Stack
      as={motion.div}
      className={styles.Action}
      aria-label={label}
      style={{ scale }}
    >
      <Stack
        as={BlankButton}
        hAlign="center"
        vAlign="center"
        fill={false}
        rowGap={4}
        hPadding={8}
        onClick={handleClick}
      >
        <IconChip icon={icon} color={color} />
        {showLabel && <Text dimmed={4} size={14}>{label}</Text>}
      </Stack>
    </Stack>
  );
};
