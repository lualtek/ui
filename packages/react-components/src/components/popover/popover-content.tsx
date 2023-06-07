import { TokensTypes } from '@lualtek/tokens';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useMemo } from 'react';

import { Elevator } from '@/components';

export type PopoverContentProps = PopoverPrimitive.PopoverContentProps & {
  /**
   * Whether to show the arrow pointing to the anchor element.
   */
  showArrow?: boolean;
  /**
   * The color of the arrow
   */
  arrowColor?: string;
  /**
   * The side of the anchor element from which the popover will appear.
   */
  side?: PopoverPrimitive.PopoverContentProps['side'];
  /**
   * The offset from the anchor element.
   */
  offset?: TokensTypes['space'];
  /**
   * Whether to use a portal to render the popover.
   */
  usePortal?: boolean;
}

export const PopoverContent = ({
  showArrow = false,
  arrowColor = 'var(--dimmed-2)',
  offset = 4,
  children,
  usePortal = true,
  side,
  ...otherProps
}: PopoverContentProps) => {
  const computeOrigin = useMemo(() => {
    if (side === 'left') {
      return { x: 8, y: 0 };
    }

    if (side === 'right') {
      return { x: -8, y: 0 };
    }

    if (side === 'top') {
      return { x: 0, y: 8 };
    }

    return { x: 0, y: -8 };
  }, [side]);

  const animation = useMemo(() => ({
    hidden: {
      ...computeOrigin,
    },
    visible: {
      y: 0,
      x: 0,
    },
  }), [computeOrigin]);

  const renderContent = useMemo(() => (
    <PopoverPrimitive.Content
      asChild
      sideOffset={Number(offset)}
      side={side}
      style={{ zIndex: 'var(--overlay-z-index)' }}
      {...otherProps}
    >
      <m.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={animation}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      >
        <Elevator resting={2}>
          {children}
        </Elevator>
        {showArrow && <PopoverPrimitive.Arrow fill={arrowColor} />}
      </m.div>
    </PopoverPrimitive.Content>
  ), [animation, arrowColor, children, offset, otherProps, showArrow, side]);

  return (
    <LazyMotion features={domAnimation} strict>
      {usePortal ? <PopoverPrimitive.Portal>{renderContent}</PopoverPrimitive.Portal> : renderContent}
    </LazyMotion>
  );
};
