'use client';

import { FC, ReactNode } from 'react';
import { DialogProps, Drawer as Vaul } from 'vaul';

import {
  ClampText,
  Panel, ResponsiveProvider, ScrollArea, Stack, Text, Title,
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
  /**
   * Enable or disable content scrolling. This is used when you want to create a scrollable element inside
   * and prevend double scrolling.
   *
   * @defaultValue true
   */
  scrollInside?: boolean;
}

const SheetContent: FC<SheetProps> = ({
  trigger,
  heading,
  description,
  scrollInside = true,
  children,
  ...otherProps
}) => (
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
          showGlow
          borderSide="top"
        >
          <Vaul.Handle />

          <Stack className={styles.Container}>
            {/* Content */}
            <ScrollArea
              useSystemStyle={false}
              canScroll={scrollInside}
            >
              {/* Header */}
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

              <div className={styles.SafeGuard}>
                {children}
              </div>
            </ScrollArea>
          </Stack>
        </Panel>
      </Vaul.Content>
    </Vaul.Portal>
  </Vaul.Root>
);
export const Sheet: FC<SheetProps> = ({ ...otherProps }) => (
  <ResponsiveProvider>
    <SheetContent {...otherProps} />
  </ResponsiveProvider>
);
