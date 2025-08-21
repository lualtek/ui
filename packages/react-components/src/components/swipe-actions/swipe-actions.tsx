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
  children: React.ReactNode;
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

const findChildrenRecursively = (children: React.ReactNode): {
  actions: Array<React.ReactElement<ActionProps>>;
} => {
  const actions: Array<React.ReactElement<ActionProps>> = [];

  /**
   * Loop through the children and find the SwipeAction and SwipeTrigger components even
   * if they are nested within fragments
   */
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }

    // Check if the child is a fragment
    if (child.type === React.Fragment) {
      // Recursively find the SwipeAction and SwipeTrigger components within the fragment's children
      const nestedChildren = findChildrenRecursively((child.props as { children?: React.ReactNode }).children);

      // Extract the actions and trigger from the nested children
      const { actions: nestedActions } = nestedChildren;

      // Push the nested actions and trigger to the main actions and trigger array
      actions.push(...nestedActions);
    }

    // Else push the child if it's a SwipeAction or SwipeTrigger' to the main actions and trigger array
    else if (child.type === SwipeAction) {
      actions.push(child as React.ReactElement<ActionProps>);
    }
  });

  return { actions };
};

const SwipeActionsRoot: FC<PropsWithChildren<SwipeActionsProps>> = ({
  children,
  trigger,
  actionsGap = 16,
}) => {
  const [actionsRef, actionsWidth] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();
  const memoChildren = useMemo(() => React.Children.toArray(children), [children]);

  const { actions: actionElements } = useMemo(() => findChildrenRecursively(memoChildren), [memoChildren]);
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
