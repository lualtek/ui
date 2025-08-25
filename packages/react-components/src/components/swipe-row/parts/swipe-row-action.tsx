import { IconNames } from '@lualtek/icons';
import { motion, useTransform } from 'motion/react';
import { FC } from 'react';

import type { IconProps, TextProps } from '../../../index';
import {
  BlankButton, Icon, Panel, PanelProps, Stack, Text,
} from '../../../index';
import styles from '../swipe-row.module.css';
import { useSwipeActions } from './swipe-row-context';

export interface SwipeRowActionProps {
  /**
   * Set the action color
   *
   * @defaultValue undefined
   */
  sentiment?: TextProps['sentiment'];
  /**
   * Set the size of the action icon
   */
  dimension?: 'small' | 'regular' | 'big';
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

type VisualPropsType = {
  dimension: Record<NonNullable<SwipeRowActionProps['dimension']>, {
    icon: IconProps['dimension'];
    padding: PanelProps['vPadding'];
    radius: PanelProps['radius'];
  }>;
  sentiment: Record<NonNullable<TextProps['sentiment']>, PanelProps['vibrancyColor']>;
};

const actionVisualProps: VisualPropsType = {
  dimension: {
    small: {
      icon: 14,
      padding: 8,
      radius: 12,
    },
    regular: {
      icon: 18,
      padding: 16,
      radius: 16,
    },
    big: {
      icon: 22,
      padding: 16,
      radius: 24,
    },
  },
  sentiment: {
    positive: 'green',
    informative: 'brand',
    danger: 'red',
    warning: 'yellow',
  },
};

/**
 * Represents the action component of the swipe row.
 *
 * This component is built to be used within `SwipeRow`. It renders a customizable button
 * while also managing click events and swipe actions.
 *
 */
export const SwipeRowAction: FC<SwipeRowActionProps> = ({
  sentiment,
  dimension = 'regular',
  icon = 'c-info',
  showLabel = false,
  label = 'My SwipeRowAction',
  onClick,
  index = 0,
}) => {
  const {
    x, actionsWidth, actionCount, closeActions,
  } = useSwipeActions();

  /**
   * Scale in the action once the trigger passed it,
   * and scale out when the trigger is released and reach the end of the beginning
   * of the action
   */
  const actionWidth = actionCount > 0 ? actionsWidth / actionCount : 0;

  const startAnimate = -(index * actionWidth);
  const endAnimate = -((index + 1) * actionWidth);

  /**
   * Map/transform the range start/endAnimate to 0 and 1 using the `x` value, then apply it to scale animation
   *
   */
  const scale = useTransform(
    x,
    [startAnimate, endAnimate],
    [0, 1],
    { clamp: true },
  );

  const handleClick = () => {
    onClick?.();

    /**
     * Call closeActions from context when an action is clicked.
     * This restore the trigger to its original position
     */
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
        rowGap={2}
        onClick={handleClick}
      >
        <Panel
          as={Stack}
          bordered
          vibrant
          vibrancyColor={sentiment ? actionVisualProps.sentiment[sentiment] : 'background'}
          radius={actionVisualProps.dimension[dimension].radius}
          vPadding={actionVisualProps.dimension[dimension].padding}
          hPadding={actionVisualProps.dimension[dimension].padding}
          vAlign="center"
          hAlign="center"
          fill={false}
        >
          <Icon
            fill={sentiment ? `var(--highlight-${actionVisualProps.sentiment[sentiment]}-foreground` : undefined}
            source={icon}
            dimension={actionVisualProps.dimension[dimension].icon}
          />
        </Panel>
        {showLabel && <Text responsive={false} dimmed={4} size={14}>{label}</Text>}
      </Stack>
    </Stack>
  );
};
