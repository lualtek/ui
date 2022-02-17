import clsx from 'clsx';
import { forwardRef } from 'react';
import { Except } from 'type-fest';

import {
  Button, Polymorphic, Popover, PopoverContentProps, Stack,
} from '@/components';

import { Elevator } from '../elevator';
import styles from './split-button.module.css';

export type SplitButtonProps = Pick<PopoverContentProps, 'side' | 'offset' | 'align'> & {
  /**
   * Set the label of the action associated to the dropdown.
   */
  label: string;
}

type PolymorphicSplitButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Button>,
Except<Polymorphic.OwnProps<typeof Button>, 'iconPosition' | 'iconColor' | 'pressed'> & SplitButtonProps
>;

export const SplitButton = forwardRef(({
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
  onClick,
  ...otherProps
}, forwardedRef) => {
  const commonProps = {
    kind,
    dimension,
    disabled,
  };

  return (
    <Stack
      className={clsx(styles.SplitButton, className)}
      direction="row"
      inline={!fullWidth}
    >
      <Button
        busy={busy}
        fullWidth={fullWidth}
        onClick={onClick}
        ref={forwardedRef}
        {...commonProps}
        {...otherProps}
      >
        {label}
      </Button>
      <Popover trigger={<Button icon={icon} {...commonProps} />}>
        <Popover.Content side={side} align={align} offset={offset}>
          <Elevator resting={2}>
            {children}
          </Elevator>
        </Popover.Content>
      </Popover>
    </Stack>
  );
}) as PolymorphicSplitButton;
