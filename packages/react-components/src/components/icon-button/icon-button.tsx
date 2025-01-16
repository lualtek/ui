import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  Button, ButtonProps, PolymorphicPropsRef,
  PropsClassChildren, PropsOf,
} from '@/components';

import styles from './icon-button.module.css';

export type IconButtonProps = Pick<
  ButtonProps,
  'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy' | 'sentiment' | 'type'
>

type PolymorphicIconButton<T extends React.ElementType = typeof Button> = PolymorphicPropsRef<
  T,
  PropsOf<typeof Button> & PropsClassChildren<IconButtonProps>
>;

type IconButtonComponent = <T extends React.ElementType = typeof Button>(
  props: PolymorphicIconButton<T>,
) => JSX.Element | React.ReactNode | null

export const IconButton: IconButtonComponent = forwardRef(
  <T extends React.ElementType = typeof Button>(
    {
      as,
      className,
      icon,
      dimension,
      kind,
      disabled,
      busy,
      ...otherProps
    }: PolymorphicIconButton<T>,
    forwardedRef?: React.ForwardedRef<T>) => (
      <Button
        ref={forwardedRef}
        icon={icon}
        dimension={dimension}
        kind={kind}
        as={as}
        disabled={disabled}
        busy={busy}
        className={clsx(styles.IconButton, className)}
        iconOpticalSize={{
          big: 24,
        }}
        {...otherProps}
      />
  ),
);

// IconButton.displayName = 'IconButton';
