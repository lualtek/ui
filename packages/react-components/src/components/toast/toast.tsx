import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

import {
  Button, Icon, IconProps, Polymorphic, Stack, Title,
} from '@/components';

import styles from './toast.module.css';

export type ToastProps = {
  /**
   * The message to display. Describes the action that the toast takes
   * or the feedback that the user has received.
   */
  children: ReactNode;
  /**
   * Set the icon to be displaye alongside the title.
   * This icon have to enforce the message in a not misleading way.
   */
  icon?: IconProps['source'];
  /**
   * Set the title of the toast. This must concisely describe the message.
   */
  title?: string;
  /**
   * Set the color and the sentiment of the toast.
   * This affects the the color of all the elements inside and should be defined
   * according to the message.
   */
  kind?: 'info' | 'warning' | 'neutral' | 'positive' | 'danger';
  /**
   * Define if the toast can be dismissed by user interaction.
   * If `true` a button will be displayed.
   */
  dismissable?: boolean;
  /**
   * Set the label of the dismiss button.
   */
  dismissLabel?: string;
  /**
   * Callback function to be called when the dismiss button is clicked.
   */
  onDismiss?: () => void;
  /**
   * Set content and actions on the same line
   */
  singleLine?: boolean;
}

type PolymorphicToast = Polymorphic.ForwardRefComponent<'output', ToastProps>;

const defaultIcons: Record<string, IconProps['source']> = {
  info: 'c-info',
  warning: 'c-warning',
  neutral: 'c-info',
  positive: 'check',
  danger: 'c-remove',
};

export const Toast = forwardRef(({
  children,
  className,
  title,
  icon,
  kind = 'neutral',
  as: Wrapper = 'output',
  dismissable,
  dismissLabel = 'Dismiss',
  singleLine,
  onDismiss,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Toast, className)}
    data-toast-kind={kind}
    role="status"
    {...otherProps}
  >
    <Stack vAlign="start" hAlign="start" direction="row" columnGap={16}>
      <Icon className={styles.Icon} source={icon || defaultIcons[kind]} dimension={24} />
      <Stack direction={singleLine ? 'row' : undefined} columnGap={16} rowGap={8} hAlign="start" fill={!!singleLine}>
        <Stack>
          {title && <Title level="6" className={styles.Title}>{title}</Title>}
          <p>{children}</p>
        </Stack>
        {dismissable && (
        <Button onClick={onDismiss} dimension="small" kind="secondary" className={styles.Action}>{dismissLabel}</Button>
        )}
      </Stack>
    </Stack>
  </Wrapper>
)) as PolymorphicToast;
