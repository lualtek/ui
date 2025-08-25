import { animate, useMotionValue } from 'motion/react';
import React, {
  FC, PropsWithChildren, useCallback, useId, useMemo,
} from 'react';
// import { useMeasure } from './hooks/useMeasure';
import { useMeasure } from 'react-use';

import { Stack, StackProps } from '../stack';
import { SwipeRowAction } from './parts/swipe-row-action';
import { SwipeRowActionProps } from './parts/swipe-row-action';
import { SwipeActionsContextType, SwipeRowContext } from './parts/swipe-row-context';
import { SwipeRowTrigger } from './parts/swipe-row-trigger';
import styles from './swipe-row.module.css';

export type SwipeRowProps = {
  /**
   * The content to display within the swipe actions.
   * Only `SwipeRowAction` and `Trigger` components are rendered
   * One Trigger only and 4 Actions maximum
   */
  children: React.ReactElement<SwipeRowActionProps> | Array<React.ReactElement<SwipeRowActionProps>>;
  trigger: React.ReactNode;
  /**
   * Set the gap between the actions. This is useful for actions
   * with long labels.
   *
   * @defaultValue 16
   */
  actionsGap?: Exclude<StackProps['columnGap'], string>;
};

const ACTIONS_LEFT_PADDING = 16;
const ACTIONS_RIGHT_PADDING = 8;

const SwipeActionsRoot: FC<PropsWithChildren<SwipeRowProps>> = ({
  children,
  trigger,
  actionsGap = 16,
}) => {
  const [actionsRef, { width: actionsWidth }] = useMeasure<HTMLDivElement>();
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

    // Filter out non-SwipeRowAction children
    const actions = source.filter(
      (child): child is React.ReactElement<SwipeRowActionProps> => React.isValidElement(child)
        && child.type === SwipeRowAction,
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
  const closeActions = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
  }, [x]);

  /**
   * Represents the context value for swipe actions.
   *
   * Contains relevant properties and methods required for managing
   * swipe actions within the context.
   */
  const contextValue: SwipeActionsContextType = useMemo(() => ({
    x,
    actionsWidth: actionsWidth + ACTIONS_LEFT_PADDING + ACTIONS_RIGHT_PADDING,
    actionCount,
    closeActions,
  }),
  [actionCount, actionsWidth, closeActions, x]);

  return (
    <SwipeRowContext.Provider value={contextValue}>
      <Stack className={styles.SwipeRow} vAlign="center">
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
            // eslint-disable-next-line react/no-array-index-key
            key: `${actionId}-${i}`,
            // inject the index property based on position
            index: actionCount - 1 - i,
          }))}
        </Stack>
        <SwipeRowTrigger>
          {trigger}
        </SwipeRowTrigger>
      </Stack>
    </SwipeRowContext.Provider>
  );
};

export const SwipeRow = Object.assign(SwipeActionsRoot, { Action: SwipeRowAction });
