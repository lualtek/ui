'use client';

import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement,
} from 'react';

import { FCChildren } from '@/components/types';

export type AspectRatioProps = {
  /**
   * Set the aspect ratio string to apply to the children.
   * The string format is `width / height`.
   * @example '16 / 9'
   */
  ratio: string;
}

export const AspectRatio: FCChildren<AspectRatioProps> = ({
  children,
  ratio,
}) => Children.map(children, child => isValidElement(child) && cloneElement(
  child as ReactElement,
  {
    style: {
      ...child.props.style as CSSProperties,
      aspectRatio: ratio,
    },
  },
));
AspectRatio.displayName = 'AspectRatio';
