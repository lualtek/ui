import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  ElementRef, forwardRef, PropsWithChildren, ReactNode,
} from 'react';

import {
  Button, Icon, IconProps, Stack, Text,
  Title,
} from '@/components';

import styles from './toast.module.css';

export type InlineToastProps = PropsWithChildren<PropsWithClass> & {
  /**
   * The message to display. Describes the action that the toast takes
   * or the feedback that the user has received.
   */
  children: ReactNode;
  /**
   * Custom actions to display in the toast.
   */
  action?: ReactNode;
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

const defaultIcons: Record<string, IconProps['source']> = {
  info: 'c-info',
  warning: 'c-warning',
  neutral: 'c-info',
  positive: 'check',
  danger: 'c-remove',
};

export const InlineToast = forwardRef<HTMLElement, InlineToastProps>(({
  children,
  className,
  title,
  icon,
  kind = 'neutral',
  dismissable,
  dismissLabel = 'Dismiss',
  singleLine,
  onDismiss,
  action,
  ...otherProps
}: InlineToastProps, forwardedRef) => (
  <Stack
    ref={forwardedRef}
    as="output"
    className={clsx(styles.Toast, className)}
    data-toast-kind={kind}
    hPadding={24}
    vPadding={16}
    role="status"
    vAlign="start"
    hAlign="start"
    direction="row"
    columnGap={16}
    {...otherProps}
  >
    <Icon className={styles.Icon} source={icon || defaultIcons[kind]} dimension={24} />
    <Stack direction={singleLine ? 'row' : undefined} columnGap={16} rowGap={8} hAlign="start" fill={!!singleLine}>
      <Stack>
        {title && (
        <ToastPrimitive.Title asChild>
          <Title level="6" className={styles.Title}>{title}</Title>
        </ToastPrimitive.Title>
        )}
        <ToastPrimitive.Description asChild>
          <Text>{children}</Text>
        </ToastPrimitive.Description>
      </Stack>
      <Stack direction="row" hAlign="start" columnGap={16}>
        {dismissable && (
          <ToastPrimitive.Close asChild>
            <Button onClick={onDismiss} dimension="small" kind="secondary" className={styles.Action}>{dismissLabel}</Button>
          </ToastPrimitive.Close>
        )}
      </Stack>
    </Stack>
  </Stack>
));

export type ToastProps = ToastPrimitive.ToastProps & InlineToastProps

export const Toast = forwardRef<
ElementRef<typeof ToastPrimitive.Root>,
ToastProps
>(({
  children,
  open,
  defaultOpen,
  type,
  duration,
  forceMount,
  onOpenChange,
  ...otherProps
}, forwardedRef) => (
  <ToastPrimitive.Root
    asChild
    ref={forwardedRef}
    open={open}
    type={type}
    duration={duration}
    forceMount={forceMount}
    onOpenChange={onOpenChange}
    defaultOpen={defaultOpen}
  >
    <InlineToast {...otherProps}>
      {children}
    </InlineToast>
  </ToastPrimitive.Root>
));

export const { ToastViewport, ToastProvider } = ToastPrimitive;
