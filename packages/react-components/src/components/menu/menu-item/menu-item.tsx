'use client';

import clsx from 'clsx';
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
} from 'react';
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';

import {
  Icon, IconProps, PolyRefComponent, Stack,
} from '@/components';

import styles from './menu-item.module.css';

export type MenuItemProps = {
  /**
   * Whether the menu item should have an icon
   */
  icon?: IconProps['source'];
  /**
   * Set the position of the icon. Used only when icon is defined.
   *
   * @defaultValue "start"
   */
  iconPosition?: 'start' | 'end';
  /**
   * Set the size of the menu item.
   * Font size and icon style will be adjusted to match the size.
   *
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular';
  /**
   * Callback function to be called when the menu item is pressed.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string | number) => void;
  /**
   * Set disabled state. The item is not interactive and grayed out.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Add or remove the padding from the menu item.
   * This space is used to keep the content aligned across items with or without icons.
   * We suggest to not remove the padding if you have items with icons in the same menu to
   * keep a good readability.
   *
   * @defaultValue true
   */
  padding?: boolean;
  /**
   * Set item to gain focus automatically when the menu is opened.
   * This property is commonly used on the first item in the menu.
   */
  autoFocus?: boolean;
  /**
   * Add an element to decorate the menu item. This is useful for adding extra elements
   * and information to the menu item.
   *
   * Don't use interactive elements (link, buttons, etc...) as decoration
   * if `Menu.Item` is rendered as ´<button>´ (default).
   */
  decoration?: ReactNode;
  /**
   * Assign a string value to the menu option. This is returned when the menu item is clicked.
   */
  value: string | number;
  /**
   * Set the sentiment color for the item
   */
  sentiment?: 'positive' | 'warning' | 'danger';
}

export const MenuItem = forwardRef(
  (
    {
      as: Component = 'button',
      className,
      children,
      onClick,
      icon,
      dimension = 'regular',
      iconPosition = 'start',
      padding = true,
      disabled = false,
      autoFocus,
      decoration,
      value,
      sentiment,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const [
      tabIndex,
      isFocused,
      handleKeyDown,
      handleClick,
    ] = useRovingTabIndex(forwardedRef as RefObject<HTMLElement>, disabled);
    const isIconAtEnd = useMemo(() => iconPosition === 'end', [iconPosition]);

    useFocusEffect(isFocused, forwardedRef as RefObject<HTMLElement>);

    const triggerClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (onClick) {
          handleClick();
          onClick(e, value ?? '');
        }
      },
      [handleClick, onClick, value],
    );

    const InnerContent = useMemo(() => (
      <Stack
        direction={isIconAtEnd ? 'row-reverse' : 'row'}
        fill={false}
        className={styles.ItemContent}
        hAlign={isIconAtEnd ? 'space-between' : 'start'}
        vAlign="center"
        columnGap={8}
        hPadding={24}
        vPadding={8}
        data-menu-item-icon-right={isIconAtEnd}
        data-menu-item-has-icon={Boolean(icon)}
        data-menu-item-padding={padding}
        style={{ inlineSize: '100%' }}
      >
        {icon && (
          <Icon
            className={styles.Icon}
            source={icon}
            dimension={dimension === 'small' ? 12 : 18}
          />
        )}
        <Stack
          className={styles.DecorationContent}
          columnGap={16}
          fill={false}
          direction="row"
          hAlign="space-between"
          vAlign="center"
        >
          {children}
          {decoration}
        </Stack>
      </Stack>
    ), [children, dimension, icon, isIconAtEnd, decoration, padding]);

    return (
      <Stack as="li" role="none">
        <Component
          autoFocus={autoFocus}
          ref={forwardedRef}
          role="menuitem"
          className={clsx(styles.MenuItem, className)}
          onClick={disabled ? undefined : triggerClick}
          onKeyDown={disabled ? undefined : handleKeyDown}
          tabIndex={tabIndex}
          aria-disabled={disabled}
          type={Component === 'button' ? 'button' : undefined}
          data-menu-item-dimension={dimension}
          data-menu-item-sentiment={sentiment}
          {...otherProps}
        >
          {InnerContent}
        </Component>
      </Stack>
    );
  },
) as PolyRefComponent<'button', PropsWithChildren<MenuItemProps>>;
