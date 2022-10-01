
import clsx from 'clsx';
import {
  Children, forwardRef, ForwardRefExoticComponent, HTMLAttributes,
} from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { Elevator, Polymorphic, Stack } from '@/components';

import * as styles from './menu.module.css';
import { MenuItem, MenuItemProps } from './menu-item/menu-item';
import { MenuItemCheckbox, MenuItemCheckboxProps } from './menu-item/menu-item-checkbox';
import { MenuSeparator } from './menu-separator/menu-separator';

export type MenuProps = PropsClassChildren<HTMLAttributes<HTMLUListElement>>

type MenuComponent = ForwardRefExoticComponent<MenuProps> & {
  Item: Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof MenuItem>,
  Polymorphic.OwnProps<typeof MenuItem> & MenuItemProps
  >;
  ItemCheckbox: Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof MenuItemCheckbox>,
  Polymorphic.OwnProps<typeof MenuItemCheckbox> & MenuItemCheckboxProps
  >;
  Separator: typeof MenuSeparator;
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(({
  className,
  children,
  ...otherProps
}, forwardedRef) => {
  const renderedChildren = Children.toArray(children).filter(Boolean);

  return (
    <Elevator resting={2}>
      <Stack
        as="ul"
        ref={forwardedRef}
        className={clsx(styles.Menu, className)}
        vPadding={8}
        role="menu"
        {...otherProps}
      >
        <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
          {Children.map(renderedChildren, (child: any) => (
            <Stack as="li" role="none" vPadding={child.type?.displayName === 'Separator' ? 8 : undefined}>
              {child}
            </Stack>
          ))}
        </RovingTabIndexProvider>
      </Stack>
    </Elevator>
  );
}) as MenuComponent;

Menu.displayName = 'Menu';

Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;
Menu.Separator = MenuSeparator;
