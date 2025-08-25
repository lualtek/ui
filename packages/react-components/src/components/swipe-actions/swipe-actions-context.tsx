import type { MotionValue } from 'motion/react';
import { createContext, useContext } from 'react';

import { StackProps } from '../stack';

export type SwipeActionsContextType = {
  x: MotionValue<number>;
  actionsWidth: number;
  actionCount: number;
  closeActions: () => void;
}

/**
 * A React context used to provide and consume swipe actions functionality within a component tree.
 * It holds the state and behavior necessary for managing swipe actions.
 * The default context value is null.
 *
 * @type {React.Context<SwipeActionsContextType | null>}
 */
export const SwipeActionsContext: React.Context<SwipeActionsContextType | null> = createContext<
  SwipeActionsContextType | null
>(null);

/**
 * Custom hook to access the SwipeActions context.
 *
 * This hook provides an interface to consume the SwipeActions context. It ensures that the
 * component using the hook is wrapped within a `SwipeActionsProvider`. If the context is
 * not available, it throws an error.
 *
 * @throws {Error} Throws an error if the hook is used outside a `SwipeActionsProvider`.
 * @returns {Object} The current context value of SwipeActions.
 */
export const useSwipeActions = () => {
  const context = useContext(SwipeActionsContext);
  if (!context) {
    throw new Error('useSwipeActions must be used within a SwipeActionsProvider');
  }

  return context;
};
