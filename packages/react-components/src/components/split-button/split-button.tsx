import clsx from 'clsx';
import { forwardRef } from 'react';
import { Except } from 'type-fest';

import {
  Button, ButtonProps, PolyRefComponent, Popover,
  PopoverContentProps, Stack,
} from '@/components';

import { Elevator } from '../elevator';
import styles from './split-button.module.css';

export type SplitButtonProps = Pick<PopoverContentProps, 'side' | 'offset' | 'align'> & {
  /**
   * Set the label of the action associated to the dropdown.
   */
  label?: string;
  /**
   * Pass the content for the popover.
   */
  children?: React.ReactNode;
}

export const SplitButton = forwardRef(
  (
    {
      as,
      className,
      label,
      icon = 'ctrl-down',
      kind,
      dimension,
      fullWidth,
      disabled,
      busy,
      children,
      side,
      align,
      offset,
      sentiment,
      onClick,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const commonProps = {
      kind,
      dimension,
      disabled,
      sentiment,
    };

    return (
      <Stack
        className={clsx(styles.SplitButton, className)}
        direction="row"
        inline={!fullWidth}
      >
        <Button
          as={as}
          busy={busy}
          fullWidth={fullWidth}
          onClick={onClick}
          ref={forwardedRef}
          {...commonProps}
          {...otherProps}
        >
          {label}
        </Button>
        <Popover>
          <Popover.Trigger><Button icon={icon} {...commonProps} /></Popover.Trigger>
          <Popover.Content side={side} align={align} offset={offset}>
            <Elevator resting={2}>
              {children}
            </Elevator>
          </Popover.Content>
        </Popover>
      </Stack>
    );
  },
) as PolyRefComponent<typeof Button,
  SplitButtonProps & Except<ButtonProps, 'iconPosition' | 'iconColor'>
>;
