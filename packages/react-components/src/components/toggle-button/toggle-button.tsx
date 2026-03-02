'use client';

import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'motion/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { Except } from 'type-fest';

import { Icon, IconButton, IconButtonProps, IconProps } from '@/components';

import styles from './toggle-button.module.css';

export type ToggleButtonProps = React.ComponentPropsWithRef<'button'> &
  Except<IconButtonProps, 'icon'> & {
    /**
     * Set the icon to show when the button is resting.
     */
    restingIcon: IconProps['source'];
    /**
     * Set the icon to show when the button is pressed/active.
     */
    pressedIcon?: IconProps['source'];
    /**
     * Set the pressed state of the button. If `pressedIcon` is set,
     * the icon will be shown instead of the resting icon.
     *
     * @defaultValue false
     */
    pressed?: boolean;
  };

const scaleAnimation = {
  scaleIn: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.34, 1],
      delay: 0,
    },
  },
  scaleOut: {
    scale: 0,
    transition: {
      duration: 0.2,
      ease: [0.3, 0.07, 1, 1],
      delay: 0,
    },
  },
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  className,
  restingIcon,
  pressedIcon,
  dimension,
  kind,
  disabled,
  pressed = false,
  onClick,
  ref: forwardedRef,
  ...otherProps
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(pressed);
  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, [pressed]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setIsPressed(!isPressed);
      onClick?.(event);
    },
    [onClick, isPressed],
  );

  const renderIcon = useCallback(
    (icon: IconProps['source'], dimension?: IconProps['dimension']) => {
      const iconSize: Record<string, IconProps['dimension']> = {
        big: 24,
        regular: 18,
        small: 12,
      };

      return <Icon source={icon} dimension={iconSize[dimension ?? 'regular']} />;
    },
    [],
  );

  return (
    <IconButton
      as="button"
      ref={forwardedRef}
      dimension={dimension}
      aria-pressed={isPressed}
      kind={kind}
      disabled={disabled}
      onClick={handleClick}
      className={clsx(styles.ToggleButton, className)}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        {isPressed && pressedIcon ? (
          <m.span
            key="pressedIcon"
            variants={scaleAnimation}
            initial={isFirstRender && isPressed ? false : 'scaleOut'}
            animate="scaleIn"
          >
            {renderIcon(pressedIcon, dimension as IconProps['dimension'])}
          </m.span>
        ) : (
          restingIcon && (
            <m.span
              key="restingIcon"
              variants={scaleAnimation}
              initial={isFirstRender && !isPressed ? false : 'scaleOut'}
              animate="scaleIn"
            >
              {renderIcon(restingIcon, dimension as IconProps['dimension'])}
            </m.span>
          )
        )}
      </LazyMotion>
    </IconButton>
  );
};
