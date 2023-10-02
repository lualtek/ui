'use client';

import clsx from 'clsx';
import {
  CSSProperties, forwardRef, ForwardRefExoticComponent, HTMLAttributes, ReactNode, useMemo,
} from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import {
  Panel,
  Polymorphic, Stack,
} from '@/components';

import styles from './menu.module.css';
import { MenuItem, MenuItemProps } from './menu-item/menu-item';
import { MenuItemCheckbox, MenuItemCheckboxProps } from './menu-item/menu-item-checkbox';
import { MenuSeparator } from './menu-separator/menu-separator';

export type MenuProps = HTMLAttributes<HTMLUListElement> & {
  /**
   * The items of the menu.
   */
  children: ReactNode;
  /**
   * Set a maximum height of the menu after which it will scroll.
   */
  maxHeight?: string;
}

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
  maxHeight,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--max-height': maxHeight,
    }
  ), [maxHeight]);

  return (
    <Panel
      bordered
      vibrant
      vibrancyColor="background"
      radius={24}
    >
      <Stack
        as="ul"
        ref={forwardedRef}
        className={clsx(styles.Menu, className)}
        style={{ ...dynamicStyle, ...style }}
        data-menu-should-scroll={Boolean(maxHeight)}
        vPadding={8}
        role="menu"
        {...otherProps}
      >
        <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
          {children}
        </RovingTabIndexProvider>
      </Stack>
    </Panel>
  );
}) as MenuComponent;

Menu.displayName = 'Menu';

Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;
Menu.Separator = MenuSeparator;
