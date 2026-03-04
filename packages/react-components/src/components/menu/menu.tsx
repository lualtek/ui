'use client';

import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { ConditionalWrapper, Panel, Stack } from '@/components';
import styles from './menu.module.css';
import { MenuItem } from './menu-item/menu-item';
import { MenuItemCheckbox } from './menu-item/menu-item-checkbox';
import { MenuSeparator } from './menu-separator/menu-separator';

export type MenuProps = React.ComponentPropsWithRef<'ul'> & {
  /**
   * The items of the menu.
   */
  children: ReactNode;
  /**
   * Set a maximum height of the menu after which it will scroll.
   */
  maxHeight?: string;
  /**
   * Render the menu inside a panel.
   * This is useful when the menu is used as a dropdown.
   *
   * @defaultValue true
   */
  wrapWithPanel?: boolean;
};

type MenuComponent = FC<MenuProps> & {
  // biome-ignore lint/style/useNamingConvention: SubComponent
  Item: typeof MenuItem;
  // biome-ignore lint/style/useNamingConvention: SubComponent
  ItemCheckbox: typeof MenuItemCheckbox;
  // biome-ignore lint/style/useNamingConvention: SubComponent
  Separator: typeof MenuSeparator;
};

export const Menu: MenuComponent = ({
  className,
  children,
  maxHeight,
  wrapWithPanel = true,
  style,
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--max-height': maxHeight,
    }),
    [maxHeight],
  );

  return (
    <ConditionalWrapper
      condition={wrapWithPanel}
      wrapper={(menuContent) => (
        <Panel bordered vibrant vibrancyColor="background" showGlow radius={24}>
          {menuContent}
        </Panel>
      )}
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
    </ConditionalWrapper>
  );
};

Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;
Menu.Separator = MenuSeparator;
