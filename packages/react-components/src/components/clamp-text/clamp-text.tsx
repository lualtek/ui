import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic } from '@/components';

import * as styles from './clamp-text.module.css';

export type ClampTextProps = PropsClassChildren<{
  /**
   * Define how many lines the text should be clamped to.
   */
  rows?: number;
  /**
   * Put the text as inline element instead of block.
   */
  inline?: boolean;
}>

type PolymorphicClampText = Polymorphic.ForwardRefComponent<'span', ClampTextProps>;

export const ClampText = forwardRef(({
  className,
  children,
  rows = 1,
  style,
  as: Wrapper = 'span',
  inline,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--r': rows,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.ClampText, className)}
      data-clamp-text-inline={inline}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicClampText;
