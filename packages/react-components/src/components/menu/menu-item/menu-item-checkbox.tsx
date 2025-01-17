import { forwardRef } from 'react';

import {
  MenuItem, MenuItemProps, PolyRefComponent,
} from '@/components';

export type MenuItemCheckboxProps = MenuItemProps & {
  /**
   * Set the default checked state of the checkbox item
   */
  checked?: boolean;
}

export const MenuItemCheckbox = forwardRef(
  (
    {
      as,
      children,
      checked,
      ...otherProps
    },
    forwardedRef,
  ) => (
    <MenuItem
      as={as}
      role="menuitemcheckbox"
      aria-checked={checked}
      ref={forwardedRef}
      {...otherProps}
    >
      {children}
    </MenuItem>
  ),
) as PolyRefComponent<typeof MenuItem, MenuItemCheckboxProps>;
