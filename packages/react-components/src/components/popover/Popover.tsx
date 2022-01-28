import * as PopoverPrimitive from '@radix-ui/react-popover';

import style from './popover.module.css';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent: React.FC = ({ children }) => (
  <PopoverPrimitive.Content className={style.Popover}>{children}</PopoverPrimitive.Content>
);
