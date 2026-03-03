'use client';

import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { useMeasure } from 'react-use';
import type { DialogProps } from 'vaul';
import { Drawer as Vaul } from 'vaul';

import {
  ClampText,
  IconButton,
  Panel,
  ResponsiveProvider,
  ScrollArea,
  Stack,
  Text,
  Title,
  useResponsiveContext,
} from '@/components';

import styles from './sheet.module.css';

type SheetContentProps = React.ComponentPropsWithRef<typeof Vaul.Content> & {
  /**
   * The interactive element that triggers the modal to open.
   * Must be a single interactive element.
   */
  trigger?: React.ComponentProps<typeof Vaul.Trigger>['children'];
  /**
   * Set the accessible title of the modal. This is used by screen readers to
   * announce the title of the modal when opened.
   */
  heading: ReactNode;
  /**
   * Hide or show the sheet heading which includes the title and the description.
   * If you hide the title, make sure to add your own title by using `Sheet.Title`  element in order
   * to provide an accessible label to the drawer.
   *
   * @defaultValue true
   */
  showHeading?: boolean;
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
   * Enable or disable padding for the content.
   */
  noPadding?: boolean;
  /**
   * Set the header of the drawer to be compact to save vertical space.
   * This is useful when the drawer is used in a mobile context.
   *
   * !important: Make sure to pass a title that fits in the compact header.
   *
   * @defaultValue false
   */
  compactHeader?: boolean;
  /**
   * Set the sheet's header to be sticky when scrolling.
   */
  stickyHeader?: boolean;
  /**
   * Set the maximum width of the sheet, on mobile the sheet will be
   * automatically collapsed when the width is reached.
   *
   * @defaultValue '600px'
   */
  maxWidth?: string;
  /**
   * Set the minimum width of the sheet, on mobile the sheet will be
   * automatically collapsed when the width is reached.
   *
   * @defaultValue '600px'
   */
  minWidth?: string;
  /**
   * Set the elevation of the Sheet.
   *
   * @defaultValue auto
   */
  zIndex?: number;
  /**
   * Allows content to scroll inside without generating overflow or to expand
   * behind the sheet height.
   *
   * @defaultValue false
   */
  scrollInside?: boolean;
  /**
   * Ref to the sheet content
   *
   */
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  /**
   * Show the close button in the header if dismissible and on desktop only
   */
  showCloseButton?: boolean;
};

const SheetContent: FC<SheetContentProps & Pick<DialogProps, 'children' | 'dismissible' | 'direction'>> = ({
  trigger,
  heading,
  headerTint,
  description,
  safePadding = true,
  noPadding = false,
  children,
  dismissible = true,
  direction = 'bottom',
  maxWidth = '600px',
  minWidth = '600px',
  compactHeader,
  stickyHeader = false,
  showHeading = true,
  scrollInside = false,
  scrollerRef,
  showCloseButton = false,
  zIndex,
  ref: forwardedRef,
}) => {
  const { matches } = useResponsiveContext();
  const [headerRef, { height: headerHeight }] = useMeasure();

  const align = useMemo(() => {
    if (direction === 'left') return 'start';
    if (direction === 'right') return 'end';
    return 'center';
  }, [direction]);

  const commonDynamicStyle = useMemo(
    () => ({
      '--sheet-z-index': zIndex,
    }),
    [zIndex],
  );

  const dynamicStyle = useMemo(
    () => ({
      ...commonDynamicStyle,
      '--max-w': maxWidth ?? undefined,
      '--min-w': minWidth ?? undefined,
      '--header-tint': headerTint,
      '--sheet-z-index': zIndex,
      // Compute the header height based on the compact header and the header height + paddings
      '--content-height': headerHeight ? `${headerHeight + (compactHeader ? 8 : 24) * 2 + 8}px` : undefined,
    }),
    [zIndex, headerTint, maxWidth, minWidth, headerHeight, commonDynamicStyle, compactHeader],
  );

  const shouldShowHandle = useMemo(() => !matches.small && dismissible, [matches, dismissible]);

  const getVPadding = useMemo(() => {
    if (showHeading || shouldShowHandle) return 0;
    return noPadding ? 0 : 16;
  }, [showHeading, noPadding, shouldShowHandle]);

  return (
    <>
      {trigger && <Vaul.Trigger asChild>{trigger}</Vaul.Trigger>}
      <Vaul.Portal>
        <Vaul.Overlay style={{ ...commonDynamicStyle, ...dynamicStyle }} className={styles.Overlay} />
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
            data-sheet-has-handle={shouldShowHandle}
            data-sheet-has-header={showHeading}
          >
            <Panel
              vibrant
              vibrancyColor="soft"
              bordered
              showGlow
              radius={matches.small ? 24 : 48}
              glowFitContent={matches.small}
            >
              {showCloseButton && dismissible && matches.small && (
                <Vaul.Close asChild>
                  <IconButton icon="remove" kind="secondary" className={styles.ClosingButton} />
                </Vaul.Close>
              )}
              <Stack className={styles.Container}>
                <ScrollArea
                  className={styles.Scroller}
                  useSystemStyle={false}
                  hideScrollbars={!matches.small}
                  ref={scrollerRef}
                  canScroll={!scrollInside}
                >
                  {/* Drag Handle */}
                  {shouldShowHandle && (
                    <Stack vPadding={8} className={styles.HandleWrapper}>
                      <Vaul.Handle />
                    </Stack>
                  )}

                  {/* Header */}
                  {showHeading && (
                    <Stack
                      ref={headerRef as React.Ref<HTMLDivElement>}
                      rowGap={4}
                      hPadding={24}
                      vPadding={compactHeader ? 8 : 24}
                      className={styles.Header}
                      data-sheet-sticky-header={stickyHeader}
                    >
                      <Vaul.Title asChild>
                        <Title lineHeight="small" responsive={false} level={compactHeader ? '6' : '5'}>
                          {heading}
                        </Title>
                      </Vaul.Title>

                      {description && (
                        <Vaul.Description asChild>
                          <Stack hPadding={[0, showCloseButton ? 48 : 0]}>
                            <Text dimmed={5} weight="regular" size={compactHeader ? 14 : 16}>
                              <ClampText rows={2}>{description}</ClampText>
                            </Text>
                          </Stack>
                        </Vaul.Description>
                      )}
                    </Stack>
                  )}

                  {/* Sheet content */}
                  <Stack
                    hPadding={noPadding ? undefined : 24}
                    vPadding={[getVPadding, 0]}
                    className={styles.SafeGuard}
                    data-sheet-scroll-inside={scrollInside}
                    fill={false}
                    data-sheet-content-safe-padding={noPadding ? false : safePadding}
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
};

export const SheetWrapper: FC<SheetProps> = ({ nested, ...otherProps }) => {
  const { matches } = useResponsiveContext();

  return nested ? (
    <Vaul.NestedRoot {...otherProps} handleOnly={matches.small}>
      <SheetContent {...otherProps} />
    </Vaul.NestedRoot>
  ) : (
    <Vaul.Root {...otherProps} handleOnly={matches.small}>
      <SheetContent {...otherProps} />
    </Vaul.Root>
  );
};

export type SheetProps = DialogProps & SheetContentProps & { nested?: boolean };

export type SheetComponent = FC<SheetProps> & {
  Close: typeof Vaul.Close;
  Title: typeof Vaul.Title;
};

export const Sheet: SheetComponent = ({ nested, ...otherProps }) => (
  <ResponsiveProvider>
    <SheetWrapper nested={nested} {...otherProps} />
  </ResponsiveProvider>
);

Sheet.Close = Vaul.Close;
Sheet.Title = Vaul.Title;
