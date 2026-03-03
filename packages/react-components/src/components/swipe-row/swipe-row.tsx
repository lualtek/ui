import { animate, useMotionValue } from 'motion/react';
import type { FC, PropsWithChildren } from 'react';
import React, { useCallback, useId, useMemo } from 'react';
import { useMeasure } from 'react-use';

import type { BleedProps } from '../bleed';
import { Bleed } from '../bleed';
import { ConditionalWrapper } from '../conditional-wrapper';
import type { StackProps } from '../stack';
import { Stack } from '../stack';
import type { SwipeRowActionProps } from './parts/swipe-row-action';
import { SwipeRowAction } from './parts/swipe-row-action';
import type { SwipeRowContextType } from './parts/swipe-row-context';
import { SwipeRowProvider } from './parts/swipe-row-context';
import { SwipeRowTrigger } from './parts/swipe-row-trigger';
import styles from './swipe-row.module.css';

export type SwipeRowProps = {
  /**
   * The content to display within the swipe actions.
   * Only `SwipeRowAction` and `Trigger` components are rendered
   * One Trigger only and 4 Actions maximum
   */
  children: React.ReactElement<SwipeRowActionProps> | Array<React.ReactElement<SwipeRowActionProps>>;
  /**
   * The content to swipe to reveal the actions.
   */
  trigger: React.ReactNode;
  /**
   * Set the gap between the actions. This is useful for actions
   * with long labels.
   *
   * @defaultValue 16
   */
  actionsGap?: Exclude<StackProps['columnGap'], string>;

  /**
   * Set the bleed amount for the swipe actions.
   */
  bleed?: Exclude<BleedProps['amount'], string>;
};

/**
 * Default values for the horizontal padding of the actions.
 */
const ACTIONS_LEFT_PADDING = 16;
const ACTIONS_RIGHT_PADDING = 8;

const SwipeActionsRoot: FC<PropsWithChildren<SwipeRowProps>> = ({ children, trigger, actionsGap = 16, bleed }) => {
  const [actionsRef, { width: actionsWidth }] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();

  const actionsPadding = useMemo(
    () => ({
      left: bleed ?? ACTIONS_LEFT_PADDING,
      right: bleed ? bleed + ACTIONS_RIGHT_PADDING : ACTIONS_RIGHT_PADDING,
    }),
    [bleed],
  );

  /**
   * Get the actions from the children:
   * - Extract the direct children
   * - If there is a Fragment as a direct child, extract its children
   * - Filter out non-SwipeRowAction children
   */
  const { actions: actionElements } = useMemo(() => {
    const directChildren = React.Children.toArray(children);
    let source = directChildren;

    // If there is a Fragment as a direct child, extract its children
    if (
      directChildren.length === 1 &&
      React.isValidElement(directChildren[0]) &&
      directChildren[0].type === React.Fragment
    ) {
      source = React.Children.toArray((directChildren[0].props as { children?: React.ReactNode }).children);
    }

    // Filter out non-SwipeRowAction children
    const actions = source.filter(
      (child): child is React.ReactElement<SwipeRowActionProps> =>
        React.isValidElement(child) && child.type === SwipeRowAction,
    );

    return { actions };
  }, [children]);

  // Count how many actions are present
  const actionCount = actionElements.length;

  /**
   * Closes the trigger with an animated transition.
   * This function animates the horizontal position of the trigger, represented by `x`,
   * back to 0. The animation uses a spring-based motion with a specified stiffness
   * and damping configuration.
   */
  const closeActions = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
  }, [x]);

  /**
   * Represents the context value for swipe actions.
   *
   * Contains relevant properties and methods required for managing
   * swipe actions within the context.
   */
  const contextValue: SwipeRowContextType = useMemo(
    () => ({
      x,
      actionsWidth: actionsWidth + actionsPadding.left + actionsPadding.right,
      actionCount,
      closeActions,
    }),
    [actionCount, actionsPadding.left, actionsPadding.right, actionsWidth, closeActions, x],
  );

  return (
    <SwipeRowProvider {...contextValue}>
      <ConditionalWrapper
        condition={Boolean(bleed)}
        wrapper={(bleedContent) => <Bleed amount={bleed}>{bleedContent}</Bleed>}
      >
        <Stack className={styles.SwipeRow} vAlign="center">
          <Stack
            ref={actionsRef}
            className={styles.ActionsContainer}
            aria-hidden="true"
            direction="row"
            hPadding={[16, actionsPadding.right] as StackProps['hPadding']}
            columnGap={actionsGap}
            fill={false}
          >
            {actionElements.map((action, i) =>
              // oxlint-disable-next-line react/no-array-index-key
              React.cloneElement(action, {
                key: `${actionId}-${i}`,
                // inject the index property based on position
                index: actionCount - 1 - i,
              }),
            )}
          </Stack>
          <SwipeRowTrigger>{trigger}</SwipeRowTrigger>
        </Stack>
      </ConditionalWrapper>
    </SwipeRowProvider>
  );
};

// Assign SwipeRowAction to the SwipeRow.Action component
export const SwipeRow = Object.assign(SwipeActionsRoot, { Action: SwipeRowAction });
