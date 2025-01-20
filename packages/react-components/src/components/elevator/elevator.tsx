import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement,
} from 'react';

import {
  ElevationDirection, ElevationLevel, ElevationShadowColor, useStyles,
} from '@/components';
import type { FCChildren } from '@/components/types';

export type ElevatorProps = {
  /**
   * Set the elevation of the component when is resting.
  */
  resting: ElevationLevel;
  /**
   * Set the elevation of the component when is hovered.
   */
  hover?: ElevationLevel;
  /**
   * Set the direction of shadow casting
   * @defaultValue "bottom"
  */
  direction?: ElevationDirection;
  /**
   * Set the color of the shadow
   * @defaultValue "oklch(0% 0 0)"
   */
  shadowColor?: ElevationShadowColor;
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
}) => {
  const { elevation } = useStyles({
    elevation: {
      resting,
      onHover: hover,
      direction,
      shadowColor: shadowColor || undefined,
    },
  });
  return Children.map(children, child => isValidElement(child) && cloneElement(
    child as ReactElement,
    {
      ...elevation.attributes,
      style: {
        ...child.props.style as CSSProperties,
        ...elevation.style,
        '--extra-shadow': extraShadow,
      },
    },
  ));
};

