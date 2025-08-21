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

const SwipeActionsRoot: FC<PropsWithChildren<SwipeActionsProps>> = ({
  children,
  trigger,
  actionsGap = 16,
}) => {
  const [actionsRef, actionsWidth] = useMeasure<HTMLDivElement>();
  const x = useMotionValue(0);
  const actionId = useId();

  const { actions: actionElements } = useMemo(() => {
    const flattenChildren = (nodes: React.ReactNode): React.ReactElement[] => {
      const flattened: React.ReactElement[] = [];
      React.Children.forEach(nodes, (node) => {
        if (!React.isValidElement(node)) return;
        if (node.type === React.Fragment) {
          flattened.push(...flattenChildren((node.props as { children?: React.ReactNode }).children));
        } else {
          flattened.push(node);
        }
      });
      return flattened;
    };

    const flatChildren = flattenChildren(children);

    const actions = flatChildren.filter(
      (child): child is React.ReactElement<ActionProps> => child.type === SwipeAction,
    );

    return { actions };
  }, [children]);

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
