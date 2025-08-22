import { IconNames } from '@lualtek/icons';
import { motion, useTransform } from 'motion/react';
import { FC } from 'react';

import { BlankButton, PanelProps } from '@/components';
import { Icon } from '@/components';
import { Panel } from '@/components';
import { Stack } from '@/components';
import { Text, TextProps } from '@/components';

import styles from './swipe-actions.module.css';
import { useSwipeActions } from './swipe-actions-context';

export interface SwipeActionProps {
  /**
   * Set the action color
   *
   * @defaultValue undefined
   */
  sentiment?: TextProps['sentiment'];
  /**
   * Set the action icon
   *
   * @defaultValue "c-info"
   */
  icon: IconNames;
  /**
   * Show the action label
   * @defaultValue false
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

const sentimentPanelColors: Record<NonNullable<TextProps['sentiment']>, PanelProps['vibrancyColor']> = {
  positive: 'green',
  informative: 'brand',
  danger: 'red',
  warning: 'yellow',
};

/**
 * Represents a functional component for an interactive action button in a swipe-enabled UI.
 *
 * This component is built to be used within swipeable actions. It renders a button with optional
 * icon, label, and hover effects while also managing click events and swipe actions.
 *
 */
export const SwipeAction: FC<SwipeActionProps> = ({
  sentiment,
  icon = 'c-info',
  showLabel = false,
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
        onClick={handleClick}
      >
        <Panel
          as={Stack}
          bordered
          vibrant
          vibrancyColor={sentiment ? sentimentPanelColors[sentiment] : 'background'}
          radius={16}
          vPadding={16}
          hPadding={16}
          vAlign="center"
          hAlign="center"
          fill={false}
        >
          <Icon fill={sentiment ? `var(--highlight-${sentimentPanelColors[sentiment]}-foreground` : undefined} source={icon} />
        </Panel>
        {showLabel && <Text dimmed={4} size={14}>{label}</Text>}
      </Stack>
    </Stack>
  );
};
