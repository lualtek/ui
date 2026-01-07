'use client';

import clsx from 'clsx';
import {
  FC,
  forwardRef, MouseEvent, useCallback, useMemo,
} from 'react';

import {
  Icon, IconProps, PolyRefComponent,
  Spinner, useStyles,
} from '@/components';

import styles from './button.module.css';

export type ButtonProps = {
  /**
   * Set the style of the button.
   * When disabled the style is overwritten.
   * @defaultValue "primary"
   */
  kind?: 'primary' | 'secondary' | 'flat';
  /**
   * Set the size of the button.
   * @defaultValue "regular"
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
   * Set the optical size of the icon. Used only when icon is defined.
   * This lets you adjust the size of the icon on different button sizes.
   *
   * !IMPORTANT: Use only if necessary, the default size is usually the best fit.
   */
  iconOpticalSize?: Partial<IconSizeProps>;
  /**
   * Set the position of the icon. Used only when icon is defined.
   * @defaultValue "start"
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
   * @defaultValue "button"
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

type ButtonComponent = PolyRefComponent<'button', ButtonProps>

type IconSizeProps = Record<NonNullable<ButtonProps['dimension']>, IconProps['dimension']>

const iconSize: IconSizeProps = {
  big: 18,
  regular: 18,
  small: 14,
};

export const Button: ButtonComponent = (
  {
    as: Component = 'button',
    kind = 'primary',
    dimension = 'regular',
    className,
    children,
    fullWidth,
    icon,
    iconOpticalSize,
    disabled,
    iconPosition = 'start',
    iconColor,
    type = 'button',
    onClick,
    busy,
    sentiment,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const { vibrancy } = useStyles();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!disabled && onClick) onClick(event);
      if (disabled) event.preventDefault();
    },
    [disabled, onClick],
  );

  const renderIcon = useMemo(() => icon && (
    <Icon
      source={icon}
      fill={iconColor}
      dimension={iconOpticalSize?.[dimension] ?? iconSize[dimension]}
    />
  ), [icon, dimension, iconColor, iconOpticalSize]);

  return (
    <Component
      ref={forwardedRef}
      type={Component === 'button' ? type : undefined}
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
      {...(kind === 'primary' || kind === 'secondary') ? vibrancy.attributes : undefined}
      {...otherProps}
    >
      {renderIcon}
      {(children && busy) ? <span>{children}</span> : children}
      {busy && (
        <span className={styles.SpinnerIndicator}>
          <Spinner dimension={dimension} />
        </span>
      )}
    </Component>
  );
};
