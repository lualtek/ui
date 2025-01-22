import {
  Children, cloneElement, CSSProperties, FC, isValidElement, ReactElement,
} from 'react';

import {
  ElevationDirection, ElevationLevel, ElevationShadowColor, useStyles,
} from '@/components';

export type ElevatorProps = {
  /**
   * The children to apply the elevation to.
   */
  children: React.ReactNode;
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

export const Elevator: FC<ElevatorProps> = ({
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

