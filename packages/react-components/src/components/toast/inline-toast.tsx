import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  forwardRef, PropsWithChildren, ReactNode, useMemo,
} from 'react';

import {
  Button, Icon, IconProps, Stack, Text,
  Title,
} from '@/components';

import styles from './toast.module.css';

const PrimitiveNoopComponent: FCChildren<{ asChild?: boolean }> = ({ children }) => <>{children}</>;

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
  /**
   * Wrap the close action inside internal primitive component
   * @private
   */
  isPrimitive?: boolean;
}

const defaultIcons: Record<string, IconProps['source']> = {
  info: 'c-info',
  warning: 'c-warning',
  neutral: 'c-info',
  positive: 'check',
  danger: 'c-remove',
};

export const InlineToast = forwardRef<HTMLOutputElement, InlineToastProps>(({
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
  isPrimitive,
  ...otherProps
}, forwardedRef) => {
  const ActionWrapper = useMemo(() => (isPrimitive ? ToastPrimitive.Close : PrimitiveNoopComponent), [isPrimitive]);
  return (
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
      <Icon className={styles.Icon} source={icon ?? defaultIcons[kind]} dimension={24} />
      <Stack direction={singleLine ? 'row' : undefined} columnGap={24} rowGap={8} hAlign="start" fill={!!singleLine}>
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
        {dismissable && (
          <Stack inline direction="row" hAlign="start">
            <ActionWrapper
              asChild
            >
              <Button
                onClick={onDismiss}
                dimension="small"
                kind="secondary"
                className={styles.Action}
              >
                {dismissLabel}
              </Button>
            </ActionWrapper>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
});
