import type { FC, ReactNode } from 'react';

export type ConditionalWrapperProps = {
  /**
   * The condition to determine whether to wrap the children.
   */
  condition: boolean;
  /**
   * The wrapper function to wrap the children.
   */
  wrapper: (children: ReactNode) => ReactNode;
  /**
   * The children to wrap.
   */
  children: ReactNode;
};

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  children,
  condition,
  wrapper = (wrappedContent) => <>{wrappedContent}</>,
}) => (condition ? wrapper(children) : children);
