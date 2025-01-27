'use client';

import { type CSSProperties, Children, type FC, type ReactElement, cloneElement, isValidElement } from 'react';

export type AspectRatioProps = {
  /**
   * The children to apply the aspect ratio to.
   */
  children: React.ReactNode;
  /**
   * Set the aspect ratio string to apply to the children.
   * The string format is `width / height`.
   * @example '16 / 9'
   */
  ratio: string;
};

export const AspectRatio: FC<AspectRatioProps> = ({ children, ratio }) =>
  Children.map(
    children,
    (child) =>
      isValidElement(child) &&
      cloneElement(child as ReactElement, {
        style: {
          ...(child.props.style as CSSProperties),
          aspectRatio: ratio,
        },
      }),
  );
