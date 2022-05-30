import {
  Children, cloneElement, ReactElement,
} from 'react';

export type ElevatorProps = {
  /**
   * Set the elevation of the component when is resting.
  */
  resting: 0 | 1 | 2 | 3 | 4;
  /**
   * Set the elevation of the component when is hovered.
   */
  hover?: 0 | 1 | 2 | 3 | 4;
}

export const Elevator: FCChildren<ElevatorProps> = ({
  children,
  resting,
  hover,
}) => (
  <>
    {Children.map(children, child => cloneElement(
      child as ReactElement,
      {
        'data-elevation': resting,
        'data-elevation-hover': hover,
      },
    ))}
  </>
);
