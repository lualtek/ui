import { animate, useMotionValue } from 'motion/react';
import React, { FC, PropsWithChildren } from 'react';

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

  const actions = React.Children
    .toArray(children)
    .filter(
      (child): child is React.ReactElement<ActionProps> => React.isValidElement(child)
        && (child.type as any).displayName === 'Action',
    );

  const trigger = React.Children.toArray(children).find(
    child => React.isValidElement(child) && (child.type as any).displayName === 'Trigger',
  );

  const closeActions = () => {
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
  };

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
          {actions}
        </div>
        {trigger}
      </div>
    </SwipeActionsContext.Provider>
  );
};

export const SwipeActions = Object.assign(SwipeActionsRoot, { Trigger, Action });
