import { forwardRef } from 'react';

import {
  MenuItem, MenuItemProps, PolymorphicPropsRef, PropsClassChildren,
  PropsOf,
} from '@/components';

export type MenuItemCheckboxProps = MenuItemProps & {
  /**
   * Set the default checked state of the checkbox item
   */
  checked?: boolean;
}

type PolymorphicMenuItemCheckbox<T extends React.ElementType = typeof MenuItem> = PolymorphicPropsRef<
  T,
  PropsOf<typeof MenuItem> & PropsClassChildren<MenuItemCheckboxProps>
>;

type MenuItemCheckboxComponent = <T extends React.ElementType = typeof MenuItem>(
  props: PolymorphicMenuItemCheckbox<T>,
) => JSX.Element | React.ReactNode | null

export const MenuItemCheckbox: MenuItemCheckboxComponent = forwardRef(
  <T extends React.ElementType = typeof MenuItem>(
    {
      as,
      children,
      checked,
      ...otherProps
    }: PolymorphicMenuItemCheckbox<T>,
    forwardedRef?: React.ForwardedRef<T>,
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
);
