/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

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
