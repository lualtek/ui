import { TokensTypes } from '@lualtek/tokens';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useMemo } from 'react';

export type PopoverContentProps = PopoverPrimitive.PopoverContentProps & {
  showArrow?: boolean;
  arrowColor?: string;
  side?: PopoverPrimitive.PopoverContentProps['side'];
  offset?: TokensTypes['space'];
}

export const PopoverContent = ({
  showArrow = false,
  arrowColor = 'var(--dimmed-2)',
  offset = 4,
  children,
  side,
  ...otherProps
}: PopoverContentProps) => {
  const computeOrigin = useMemo(() => {
    if (side === 'left') {
      return { x: 20, y: 0 };
    }

    if (side === 'right') {
      return { x: -20, y: 0 };
    }

    if (side === 'top') {
      return { x: 0, y: 20 };
    }

    return { x: 0, y: -20 };
  }, [side]);

  const animation = useMemo(() => ({
    hidden: {
      opacity: 0,
      ...computeOrigin,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }), [computeOrigin]);

  return (
    <LazyMotion features={domAnimation} strict>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content asChild sideOffset={Number(offset)} side={side} {...otherProps}>
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
            {children}
            {showArrow && <PopoverPrimitive.Arrow fill={arrowColor} />}
          </m.div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </LazyMotion>
  );
};
