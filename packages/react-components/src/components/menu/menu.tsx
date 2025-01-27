'use client';

import clsx from 'clsx';
import { type ReactNode, forwardRef, useMemo } from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { Panel, Stack } from '@/components';

import { MenuItem } from './menu-item/menu-item';
import { MenuItemCheckbox } from './menu-item/menu-item-checkbox';
import { MenuSeparator } from './menu-separator/menu-separator';
import styles from './menu.module.css';

export type MenuProps = React.ComponentPropsWithRef<'ul'> & {
  /**
   * The items of the menu.
   */
  children: ReactNode;
  /**
   * Set a maximum height of the menu after which it will scroll.
   */
  maxHeight?: string;
};

type MenuComponent = React.ForwardRefExoticComponent<MenuProps> & {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  Item: typeof MenuItem;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  ItemCheckbox: typeof MenuItemCheckbox;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  Separator: typeof MenuSeparator;
};

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ className, children, maxHeight, style, ...otherProps }, forwardedRef) => {
    const dynamicStyle = useMemo(
      () => ({
        '--max-height': maxHeight,
      }),
      [maxHeight],
    );

    return (
      <Panel bordered vibrant vibrancyColor="background" showGlow radius={24}>
        <Stack
          as="menu"
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
  },
) as MenuComponent;

Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;
Menu.Separator = MenuSeparator;
