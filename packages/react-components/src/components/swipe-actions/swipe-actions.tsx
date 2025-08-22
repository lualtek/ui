import { animate, useMotionValue } from 'motion/react';
import React, {
  FC, PropsWithChildren, useId, useMemo,
} from 'react';

import { Stack, StackProps } from '../stack';
import { useMeasure } from './hooks/useMeasure';
import { SwipeAction } from './swipe-action';
import { ActionProps } from './swipe-action';
import styles from './swipe-actions.module.css';
import { SwipeActionsContext, SwipeActionsContextType } from './swipe-actions-context';
import { SwipeTrigger, TriggerProps } from './swipe-trigger';

export type SwipeActionsProps = {
  /**
   * The content to display within the swipe actions.
   * Only `Action` and `Trigger` components are rendered
   * One Trigger only and 4 Actions maximum
   */
  children: React.ReactElement<ActionProps> | Array<React.ReactElement<ActionProps>>;
  trigger: React.ReactNode;
  /**
   * Set the gap between the actions. This is useful for actions
   * with long labels.
   *
   * @defaultValue 16
   */
  actionsGap?: StackProps['columnGap'];
};

const ACTIONS_LEFT_PADDING = 16;
const ACTIONS_RIGHT_PADDING = 8;

const SwipeActionsRoot: FC<PropsWithChildren<SwipeActionsProps>> = ({
  children,
  trigger,
  actionsGap = 16,
}) => {
  const [actionsRef, actionsWidth] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();

  const { actions: actionElements } = useMemo(() => {
    const directChildren = React.Children.toArray(children);
    let source = directChildren;

    // If there is a Fragment as a direct child, extract its children
    if (
      directChildren.length === 1
      && React.isValidElement(directChildren[0])
      && directChildren[0].type === React.Fragment
    ) {
      source = React.Children.toArray((directChildren[0].props as { children?: React.ReactNode }).children);
    }

    // Filter out non-SwipeAction children
    const actions = source.filter(
      (child): child is React.ReactElement<ActionProps> => React.isValidElement(child) && child.type === SwipeAction,
    );

    return { actions };
  }, [children]);

  // Count how many actions are present
  const actionCount = actionElements.length;

  /**
   * Closes or dismisses an element or component with an animated transition.
   * This function animates the horizontal position of an element, represented by `x`,
   * back to 0. The animation uses a spring-based motion with a specified stiffness
   * and damping configuration.
   *
   * @function
   * @returns {void} Does not return a value.
   */
  const closeActions = (): void => {
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
  };

  /**
   * Represents the context value for swipe actions.
   *
   * Contains relevant properties and methods required for managing
   * swipe actions within the context.
   */
  const contextValue: SwipeActionsContextType = {
    x,
    actionsWidth: actionsWidth + ACTIONS_LEFT_PADDING + ACTIONS_RIGHT_PADDING,
    actionCount,
    closeActions,
  };

  return (
    <SwipeActionsContext.Provider value={contextValue}>
      <div className={styles.SwipeActions}>
        <Stack
          ref={actionsRef}
          className={styles.ActionsContainer}
          aria-hidden="true"
          direction="row"
          hPadding={[16, 8]}
          columnGap={actionsGap}
          fill={false}
        >
          {actionElements.map((action, i) => React.cloneElement(action, {
            key: actionId,
            // inject the index property based on position
            index: actionCount - 1 - i,
          }))}
        </Stack>
        <SwipeTrigger>
          {trigger}
        </SwipeTrigger>
      </div>
    </SwipeActionsContext.Provider>
  );
};

export const SwipeActions = Object.assign(SwipeActionsRoot, { Action: SwipeAction });
