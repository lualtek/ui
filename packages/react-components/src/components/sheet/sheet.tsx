'use client';

import { FC, ReactNode } from 'react';
import { DialogProps, Drawer as Vaul } from 'vaul';

import {
  ClampText,
  Panel, ResponsiveProvider, Stack, Text, Title, useResponsiveContext,
} from '@/components';

import styles from './sheet.module.css';

export type SheetProps = DialogProps & {
  /**
   * The interactive element that triggers the modal to open.
   * Must be a single interactive element.
   */
  trigger: React.ComponentProps<typeof Vaul.Trigger>['children'];
  /**
   * Set the accessible title of the modal. This is used by screen readers to
   * announce the title of the modal when opened.
   */
  heading: ReactNode;
  /**
   * An optional accessible description to be announced when the drawer is opened.
   */
  description?: React.ComponentProps<typeof Vaul.Description>['children'];
}

const SheetContent: FC<SheetProps> = ({
  trigger,
  heading,
  description,
  children,
  open,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return (
    <Vaul.Root {...otherProps}>
      <Vaul.Trigger asChild>
        {trigger}
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className={styles.Overlay} />
        <Vaul.Content className={styles.Content}>
          <Panel
            vibrant
            vibrancyColor="soft"
            bordered
            showGlow={matches.small}
            borderSide="top"
          >
            <Stack>
              <Stack
                rowGap={4}
                hPadding={24}
                vPadding={24}
                className={styles.Header}
              >
                <Vaul.Title asChild>
                  <Title lineHeight="small" responsive={false} level="5">{heading}</Title>
                </Vaul.Title>

                {description && (
                  <Vaul.Description asChild>
                    <Text dimmed={5} weight="regular" size={16}>
                      <ClampText rows={2}>{description}</ClampText>
                    </Text>
                  </Vaul.Description>
                )}
              </Stack>
              <Stack hPadding={24} vPadding={24}>
                {children}
              </Stack>
            </Stack>
          </Panel>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
};

export const Sheet: FC<SheetProps> = ({ ...otherProps }) => (
  <ResponsiveProvider>
    <SheetContent {...otherProps} />
  </ResponsiveProvider>
);
