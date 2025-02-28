'use client';

import {
  FC, forwardRef, ReactNode, useMemo,
} from 'react';
import { DialogProps, Drawer as Vaul } from 'vaul';

import {
  ClampText,
  Panel, ResponsiveProvider, ScrollArea, Stack, Text, Title, useResponsiveContext,
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
   * Set the background color for the content header
   */
  headerTint?: string;
  /**
   * An optional accessible description to be announced when the drawer is opened.
   */
  description?: React.ComponentProps<typeof Vaul.Description>['children'];
  /**
   * Enable or disable safe padding. Prevents content from being hidden behind the safe area.
   *
   * @defaultValue true
   */
  safePadding?: boolean;
}

const SheetContent = forwardRef<HTMLDivElement, SheetProps>(({
  trigger,
  heading,
  headerTint,
  description,
  safePadding = true,
  children,
  open,
  ...otherProps
}, forwardedRef) => {
  const { matches } = useResponsiveContext();

  const dynamicStyle = useMemo(() => (
    {
      '--header-tint': headerTint,
    }
  ), [headerTint]);

  return (
    <Vaul.Root {...otherProps}>
      <Vaul.Trigger asChild>
        {trigger}
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className={styles.Overlay} />
        <Vaul.Content asChild>
          <Stack
            style={{ ...dynamicStyle }}
            className={styles.Sheet}
            ref={forwardedRef}
            hAlign="center"
            hPadding={8}
            vPadding={[0, 8]}
          >
            <Panel
              vibrant
              vibrancyColor="soft"
              bordered
              showGlow
              radius={24}
              glowFitContent
            >

              <Stack className={styles.Container}>
                <ScrollArea useSystemStyle={false} hideScrollbars>
                  <Stack vPadding={8} className={styles.HandleWrapper}>
                    <Vaul.Handle />
                  </Stack>

                  {/* Header */}
                  <Stack
                    rowGap={4}
                    hPadding={24}
                    vPadding={[0, 24]}
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

                  {/* Sheet content */}
                  <Stack
                    hPadding={24}
                    className={styles.SafeGuard}
                    data-modal-content-safe-padding={safePadding}
                  >
                    {children}
                  </Stack>
                </ScrollArea>
              </Stack>
            </Panel>
          </Stack>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
});

export const Sheet: FC<SheetProps> = ({ ...otherProps }) => (
  <ResponsiveProvider>
    <SheetContent {...otherProps} />
  </ResponsiveProvider>
);
