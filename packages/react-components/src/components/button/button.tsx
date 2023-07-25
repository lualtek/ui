'use client';

import clsx from 'clsx';
import {
  forwardRef, MouseEvent, useCallback, useMemo,
} from 'react';

import {
  Icon, IconProps, Polymorphic, Spinner,
} from '@/components';

import styles from './button.module.css';

export type ButtonProps = {
  /**
   * Set the style of the button.
   * When disabled the style is overwritten.
   */
  kind?: 'primary' | 'secondary' | 'flat';
  /**
   * Set the size of the button.
   */
  dimension?: 'regular' | 'small' | 'big';
  /**
   * Make the button full width, filling the available space.
   */
  fullWidth?: boolean;
  /**
   * Define the icon to use.
   */
  icon?: IconProps['source'];
  /**
   * Set the position of the icon. Used only when icon is defined.
   */
  iconPosition?: 'start' | 'end';
  /**
   * Override the color of the icon. Used only when icon is defined.
   */
  iconColor?: string;
  /**
   * Set disabled state. The button is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Pass the HTML attribute `type` to the button.
   * If not specified, the type is always 'button' when rendered as `<button>.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Set the loading state and show a spinner.
   */
  busy?: boolean;
  /**
   * Callback function to be called when the button is clicked.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Set a sentiment color/status to convey meaning and important to the action
   */
  sentiment?: 'positive' | 'warning' | 'danger';
}

type PolymorphicButton = Polymorphic.ForwardRefComponent<'button', ButtonProps>;

type IconSizeProps = Record<NonNullable<ButtonProps['dimension']>, IconProps['dimension']>

const iconSize: IconSizeProps = {
  big: 18,
  regular: 18,
  small: 14,
};

export const Button = forwardRef(({
  kind = 'primary',
  dimension = 'regular',
  className,
  children,
  fullWidth,
  icon,
  disabled,
  iconPosition = 'start',
  iconColor,
  type = 'button',
  onClick,
  busy,
  as: Wrapper = 'button',
  sentiment,
  ...otherProps
}, forwardedRef) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && onClick) onClick(event);
      if (disabled) event.preventDefault();
    },
    [disabled, onClick],
  );

  const withIcon = useMemo(() => icon && (
    <Icon
      source={icon}
      fill={iconColor}
      dimension={iconSize[dimension]}
    />
  ), [icon, dimension, iconColor]);

  return (
    <Wrapper
      ref={forwardedRef}
      type={Wrapper === 'button' ? type : undefined}
      className={clsx(styles.Button, className)}
      data-button-icon-position={iconPosition}
      data-button-dimension={dimension}
      data-button-kind={kind}
      data-button-sentiment={sentiment}
      data-button-fullwidth={fullWidth}
      aria-disabled={disabled}
      disabled={busy}
      aria-busy={busy}
      aria-live={busy ? 'polite' : undefined}
      onClick={handleClick}
      {...otherProps}
    >
      {withIcon}
      {(children && busy) ? <span>{children}</span> : children}
      {busy && (
        <span className={styles.SpinnerIndicator}>
          <Spinner dimension={dimension} />
        </span>
      )}
    </Wrapper>
  );
}) as PolymorphicButton;

Button.displayName = 'Button';
