import { animate, useMotionValue } from 'motion/react';
import React, {
  FC, PropsWithChildren, useId, useMemo,
} from 'react';

import { useMeasure } from './hooks/useMeasure';
import { SwipeAction } from './swipe-action';
import { ActionProps } from './swipe-action';
import styles from './swipe-actions.module.css';
import { SwipeActionsContext, SwipeActionsContextType } from './swipe-actions-context';
import { SwipeTrigger } from './swipe-trigger';

export type SwipeActionsProps = {
  /**
   * The content to display within the swipe actions.
   * Only `Action` and `Trigger` components are rendered
   * One Trigger only and 4 Actions maximum
   */
  children: React.ReactNode;
};

const SwipeActionsRoot: FC<PropsWithChildren<SwipeActionsProps>> = ({ children }) => {
  const [actionsRef, actionsWidth] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();
  const memoChildren = useMemo(() => React.Children.toArray(children), [children]);

  /**
   * Filter the children to only include Action components.
   */
  const actionElements = memoChildren
    .filter(
      (child): child is React.ReactElement<ActionProps> => React.isValidElement(child)
        && child.type === SwipeAction,
    );

  const actionCount = actionElements.length;

  /**
   * Represents the specific React element of type 'Trigger' found within the `memoChildren` collection.
   * The variable locates the first valid React element in the array whose type's displayName property
   * matches the string 'Trigger'.
   *
   * The displayName property is used to verify that the identified element corresponds to the appropriate type.
   */
  const trigger = memoChildren.find(
    child => React.isValidElement(child) && child.type === SwipeTrigger,
  );

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
    actionsWidth,
    actionCount,
    closeActions,
  };

  return (
    <SwipeActionsContext.Provider value={contextValue}>
      <div className={styles.SwipeActions}>
        <div
          ref={actionsRef}
          className={styles.ActionsContainer}
          aria-hidden="true"
        >
          {actionElements.map((action, i) => React.cloneElement(action, {
            key: actionId,
            // inject the index property based on position
            index: actionCount - 1 - i,
          }))}
        </div>
        {trigger}
      </div>
    </SwipeActionsContext.Provider>
  );
};

export const SwipeActions = Object.assign(SwipeActionsRoot, { Trigger: SwipeTrigger, Action: SwipeAction });
