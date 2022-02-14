import { TokensTypes } from '@lualtek/tokens';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { domAnimation, LazyMotion, m } from 'framer-motion';

export type PopoverContentProps = PopoverPrimitive.PopoverContentProps & {
  showArrow?: boolean;
  arrowColor?: string;
  offset?: TokensTypes['space'];
}

const animation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const PopoverContent = ({
  showArrow = false,
  arrowColor = 'var(--dimmed-2)',
  offset = 4,
  children,
  ...otherProps
}: PopoverContentProps) => (
  <LazyMotion features={domAnimation} strict>
    <PopoverPrimitive.Content asChild sideOffset={Number(offset)} {...otherProps}>
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
  </LazyMotion>
);
