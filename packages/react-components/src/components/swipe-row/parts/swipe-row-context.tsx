import constate from 'constate';
import type { MotionValue } from 'motion/react';

export type SwipeRowContextType = {
  x: MotionValue<number>;
  actionsWidth: number;
  actionCount: number;
  closeActions: () => void;
};

/**
 * Custom hook to manage the state of a SwipeRow component.
 */
function useSwipeRowState(props: SwipeRowContextType) {
  return props;
}

/**
 * Export the SwipeRowProvider and useSwipeRow hooks using constate.
 */
export const [SwipeRowProvider, useSwipeRow] = constate(useSwipeRowState);
