import { FC, ReactNode } from 'react';

export type ConditionalWrapperProps = {
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  children,
  condition,
  wrapper = children => <>{children}</>,
}) => (condition ? wrapper(children) : children);

ConditionalWrapper.displayName = 'ConditionalWrapper';
