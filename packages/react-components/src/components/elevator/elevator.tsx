import {
  Children, cloneElement, isValidElement, ReactElement,
} from 'react';

import { FCChildren } from '@/components/types';

export type ElevatorProps = {
  /**
   * Set the elevation of the component when is resting.
  */
  resting: 0 | 1 | 2 | 3 | 4;
  /**
   * Set the elevation of the component when is hovered.
   */
  hover?: 0 | 1 | 2 | 3 | 4;
  /**
   * Set the direction of shadow casting
  */
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const Elevator: FCChildren<ElevatorProps> = ({
  children,
  resting,
  direction = 'bottom',
  hover,
}) => (
  <>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child as ReactElement,
      {
        'data-elevation': resting,
        'data-elevation-direction': direction,
        'data-elevation-hover': hover,
      },
    ))}
  </>
);

Elevator.displayName = 'Elevator';
