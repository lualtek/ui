import {
  MenuItem, MenuItemProps, PolyRefComponent,
} from '@/components';

export type MenuItemCheckboxProps = MenuItemProps & {
  /**
   * Set the default checked state of the checkbox item
   */
  checked?: boolean;
}

type MenuItemCheckboxComponent = PolyRefComponent<typeof MenuItem, MenuItemCheckboxProps>

export const MenuItemCheckbox: MenuItemCheckboxComponent = (
  {
    as = 'button' as React.ElementType,
    children,
    checked,
    ref: forwardedRef,
    ...otherProps
  },
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
);
