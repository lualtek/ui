'use client';

import {
  FC, forwardRef, ReactNode, useMemo,
} from 'react';
import { DialogProps, Drawer as Vaul } from 'vaul';

import {
  ClampText, Panel, ResponsiveProvider, ScrollArea,
  Stack, Text, Title,
  useResponsiveContext,
} from '@/components';

import styles from './sheet.module.css';

type SheetContentProps = {
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
  /**
   * Set the maximum width of the drawer, on mobile the drawer will be
   * automatically collapsed when the width is reached.
   */
  maxWidth?: string;
}

const SheetContent = forwardRef<
HTMLDivElement,
SheetContentProps & Pick<DialogProps, 'children' | 'dismissible' | 'direction'>
>(({
  trigger,
  heading,
  headerTint,
  description,
  safePadding = true,
  children,
  dismissible,
  direction = 'bottom',
  maxWidth = 600,
}, forwardedRef) => {
  const { matches } = useResponsiveContext();
  const align = useMemo(() => {
    if (direction === 'left') return 'start';
    if (direction === 'right') return 'end';
    return 'center';
  }, [direction]);

  const dynamicStyle = useMemo(() => (
    {
      '--max-w': maxWidth ? `${maxWidth}px` : undefined,
      '--header-tint': headerTint,
    }
  ), [headerTint, maxWidth]);

  return (
    <>
      <Vaul.Trigger asChild>
        {trigger}
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className={styles.Overlay} />
        <Vaul.Content asChild>
          <Stack
            style={{ ...dynamicStyle }}
            className={styles.Sheet}
            tabIndex={-1}
            ref={forwardedRef}
            hAlign={align}
            vAlign="start"
            hPadding={8}
            vPadding={8}
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
                <ScrollArea
                  className={styles.Scroller}
                  useSystemStyle={false}
                  hideScrollbars
                >
                  {/* Drag Handle */}
                  {!matches.small && (
                    <>
                      {dismissible && (
                        <Stack vPadding={8} className={styles.HandleWrapper}>
                          <Vaul.Handle />
                        </Stack>
                      )}
                    </>
                  )}

                  {/* Header */}
                  <Stack
                    rowGap={4}
                    hPadding={24}
                    vPadding={[24, 24]}
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
    </>
  );
});

export const SheetWrapper: FC<SheetProps> = ({
  nested,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return nested ? (
    <Vaul.NestedRoot
      {...otherProps}
      handleOnly={matches.small}
    >
      <SheetContent {...otherProps} />
    </Vaul.NestedRoot>
  ) : (
    <Vaul.Root
      {...otherProps}
      handleOnly={matches.small}
    >
      <SheetContent {...otherProps} />
    </Vaul.Root>
  );
};

export type SheetProps = DialogProps & SheetContentProps & { nested?: boolean };

export const Sheet: FC<SheetProps> = ({ nested, ...otherProps }) => (
  <ResponsiveProvider>
    <SheetWrapper nested={nested} {...otherProps} />
  </ResponsiveProvider>
);

