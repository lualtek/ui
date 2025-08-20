import type { MotionValue } from 'motion/react';
import { createContext, useContext } from 'react';

export type SwipeActionsContextType = {
  x: MotionValue<number>;
  actionsWidth: number;
  actionCount: number;
  closeActions: () => void;
}

export const SwipeActionsContext = createContext<SwipeActionsContextType | null>(null);

export const useSwipeActions = () => {
  const context = useContext(SwipeActionsContext);
  if (!context) {
    throw new Error('useSwipeActions must be used within a SwipeActionsProvider');
  }

  return context;
};
