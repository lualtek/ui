import clsx from 'clsx';
import {
  forwardRef, ReactNode, useCallback, useMemo, useRef,
} from 'react';
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';

import {
  Icon, IconProps, Polymorphic, Stack,
} from '@/components';

import * as styles from './menu-item.module.css';

export type MenuItemProps = PropsClassChildren<{
  /**
   * Whether the menu item should have an icon
   */
  icon?: IconProps['source'];
  /**
   * Set the position of the icon. Used only when icon is defined.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Set the size of the menu item.
   * Font size and icon style will be adjusted to match the size.
   */
  dimension?: 'small' | 'regular';
  /**
   * Callback function to be called when the menu item is pressed.
   */
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  /**
   * Set disabled state. The item is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Add or remove the padding from the menu item.
   * This space is used to keep the content aligned across items with or without icons.
   * We suggest to not remove the padding if you have items with icons in the same menu to
   * keep a good readability.
   */
  padding?: boolean;
  /**
   * Set item to gain focus automatically when the menu is opened.
   * This property is commonly used on the first item in the menu.
   */
  autoFocus?: boolean;
  /**
   * Add an element to decorate the menu item. This is useful for adding extra elements
   * and informations to the menu item.
   *
   * @note Don't use interactive elements (link, buttons, etc..) as decoration
   * if `Menu.Item` is rendered as ´<button>´ (default).
   */
  decoration?: ReactNode;
}>

type PolymorphicMenuItem = Polymorphic.ForwardRefComponent<'button', MenuItemProps>;

export const MenuItem = forwardRef(({
  className,
  children,
  onClick,
  icon,
  dimension = 'regular',
  as: Wrapper = 'button',
  iconPosition = 'left',
  padding = true,
  disabled = false,
  autoFocus,
  decoration,
  ...otherProps
}, forwardedRef) => {
  const itemRef = useRef<any>(forwardedRef);
  const [tabIndex, isFocused, handleKeyDown, handleClick] = useRovingTabIndex(itemRef, disabled);
  const isIconRight = iconPosition === 'right';

  useFocusEffect(isFocused, itemRef);

  const triggerClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        handleClick();
        onClick(event);
      }
    },
    [handleClick, onClick],
  );

  const InnerContent = useMemo(() => (
    <Stack
      direction={isIconRight ? 'row-reverse' : 'row'}
      fill={false}
      className={styles.ItemContent}
      hAlign={isIconRight ? 'space-between' : 'start'}
      vAlign="center"
      columnGap={8}
      hPadding={24}
      vPadding={8}
      data-menu-item-icon-right={isIconRight}
      data-menu-item-has-icon={Boolean(icon)}
      data-menu-item-padding={padding}
      style={{ inlineSize: '100%' }}
    >
      {icon && (
        <Icon
          source={icon}
          dimension={dimension === 'small' ? 12 : 16}
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
  ), [children, dimension, icon, isIconRight, decoration, padding]);

  return (
    <Wrapper
      autoFocus={autoFocus}
      ref={itemRef}
      role="menuitem"
      className={clsx(styles.MenuItem, className)}
      onClick={disabled ? undefined : triggerClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      tabIndex={tabIndex}
      aria-disabled={disabled}
      type={Wrapper === 'button' ? 'button' : undefined}
      data-menu-item-dimension={dimension}
      {...otherProps}
    >
      {InnerContent}
    </Wrapper>
  );
}) as PolymorphicMenuItem;

MenuItem.displayName = 'Menu.Item';
