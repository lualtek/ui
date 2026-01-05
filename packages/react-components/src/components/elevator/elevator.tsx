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

import {
  Children, cloneElement, ComponentProps, CSSProperties, FC, isValidElement, PropsWithChildren, ReactElement,
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

  return Children.map(children, (child) => {
    if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
      return cloneElement(child,
        {
          ...elevation.attributes,
          style: {
            ...((child.props.style ?? {})),
            ...elevation.style,
            '--extra-shadow': extraShadow,
          },
        });
    }

    return undefined;
  });
};

