import { IconNames } from '@lualtek/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  forwardRef, useCallback, useEffect, useState,
} from 'react';
import { Except } from 'type-fest';

import {
  Icon, IconButton, IconButtonProps, IconProps, Polymorphic,
} from '@/components';

import * as styles from './toggle-button.module.css';

export type ToggleButtonProps = Except<IconButtonProps, 'icon'> & {
  /**
   * Set the icon to show when the button is resting.
   */
  restingIcon: IconButtonProps['icon'];
  /**
   * Set the icon to show when the button is pressed/active.
   */
  pressedIcon?: IconButtonProps['icon'];
  /**
   * Set the pressed state of the button. If `pressedIcon` is set,
   * the icon will be shown instead of the resting icon.
   */
  pressed?: boolean;
}

type PolymorphicToggleButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof IconButton>,
Polymorphic.OwnProps<typeof IconButton> & ToggleButtonProps
>;

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

export const ToggleButton = forwardRef(({
  className,
  restingIcon,
  pressedIcon,
  dimension,
  kind,
  disabled,
  iconColor,
  pressed = false,
  onClick,
  ...otherProps
}, forwardedRef) => {
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
    (icon: IconNames, dimension?: IconProps['dimension']) => {
      const iconSize: Record<string, IconProps['dimension']> = {
        big: 24,
        regular: 18,
        small: 12,
      };

      return (<Icon source={icon} dimension={iconSize[dimension ?? 'regular']} />);
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
      {isPressed && pressedIcon
        ? (
          <motion.span
            key="pressedIcon"
            variants={scaleAnimation}
            initial={isFirstRender && isPressed ? false : 'scaleOut'}
            animate="scaleIn"
          >
            {renderIcon(pressedIcon as IconNames, dimension as IconProps['dimension'])}
          </motion.span>
        )
        : restingIcon && (
          <motion.span
            key="restingIcon"
            variants={scaleAnimation}
            initial={isFirstRender && !isPressed ? false : 'scaleOut'}
            animate="scaleIn"
          >
            {renderIcon(restingIcon as IconNames, dimension as IconProps['dimension'])}
          </motion.span>
        )
      }
    </IconButton>
  );
}) as PolymorphicToggleButton;
