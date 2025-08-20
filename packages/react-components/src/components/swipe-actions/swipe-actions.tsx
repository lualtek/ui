import { animate, useMotionValue } from 'motion/react';
import React, {
  FC, PropsWithChildren, useId, useMemo,
} from 'react';

import { useMeasure } from './hooks/useMeasure';
import styles from './swipe-actions.module.css';
import { Action } from './swipe-actions-action';
import { ActionProps } from './swipe-actions-action';
import { SwipeActionsContext, SwipeActionsContextType } from './swipe-actions-context';
import { Trigger } from './swipe-actions-trigger';

export type SwipeActionsProps = {
  children: React.ReactNode;
};

const SwipeActionsRoot: FC<PropsWithChildren<SwipeActionsProps>> = ({ children }) => {
  const [actionsRef, actionsWidth] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();
  const memoChildren = useMemo(() => React.Children.toArray(children), [children]);

  const actionElements = memoChildren
    .filter(
      (child): child is React.ReactElement<ActionProps> => React.isValidElement(child)
        && (child.type as any).displayName === 'Action',
    );

  const actionCount = actionElements.length;

  const actions = memoChildren
    .filter(
      (child): child is React.ReactElement<ActionProps> => React.isValidElement(child)
        && (child.type as any).displayName === 'Action',
    );

  const trigger = memoChildren.find(
    child => React.isValidElement(child) && (child.type as any).displayName === 'Trigger',
  );

  /**
   * Closes an action by animating a transition for the target `x` value to 0.
   * The animation uses a spring configuration with specified stiffness and damping.
   */
  const closeActions = () => {
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
    actionCount: actions.length,
    closeActions,
  };

  return (
    <SwipeActionsContext.Provider value={contextValue}>
      <div className={styles.SwipeActions}>
        <div
          ref={actionsRef}
          className={styles.TriggerContainer}
          aria-hidden="true"
        >
          {actionElements.map((action, i) => React.cloneElement(action, {
            key: actionId,
            index: actionCount - 1 - i,
          }))}
        </div>
        {trigger}
      </div>
    </SwipeActionsContext.Provider>
  );
};

export const SwipeActions = Object.assign(SwipeActionsRoot, { Trigger, Action });
