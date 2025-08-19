import React from 'react';

export type SlideActionsProps = {
  actions: React.ReactNode;
}

export const SlideActions: React.FC<SlideActionsProps> = ({
  actions,
  ...otherProps
}) => (
  <div {...otherProps}>
    ciao
  </div>
);
