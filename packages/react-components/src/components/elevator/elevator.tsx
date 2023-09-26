import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement,
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
   * @defaultValue 'bottom'
  */
  direction?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Set the color of the shadow
   * @defaultValue 'oklch(0% 0 0)'
   */
  shadowColor?: string;
  /**
   * Add extra shadow to the component.
   * Whis shadow is added to the elevation shadow.
   */
  extraShadow?: string;
}

export const Elevator: FCChildren<ElevatorProps> = ({
  children,
  resting,
  direction = 'bottom',
  shadowColor = 'oklch(0% 0 0)',
  extraShadow,
  hover,
}) => Children.map(children, child => isValidElement(child) && cloneElement(
  child as ReactElement,
  {
    'data-elevation': resting,
    'data-elevation-direction': direction,
    'data-elevation-hover': hover,
    style: {
      ...child.props.style as CSSProperties,
      '--shadow-color': shadowColor,
      '--extra-shadow': extraShadow,
    },
  },
));

Elevator.displayName = 'Elevator';
