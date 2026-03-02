'use client';

import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react';

import type { IconProps, TextProps } from '@/components';
import { Icon, Interpolator, Text } from '@/components';

import styles from './disclosure.module.css';

export type DisclosureProps = React.ComponentPropsWithRef<'details'> & {
  /**
   * Set the initial state of the disclosure.
   * @defaultValue false
   */
  open?: boolean;
  /**
   * Define the text to be displayed as the summary of the disclosure.
   * This should generally be a short sentenc and related to the content
   */
  summary: ReactNode;
  /**
   * Remove or add a padding to align the content with the icon indicator.
   * This is useful when the content inside starts with text and you want to align it
   * summary to improve readability.
   *
   * @defaultValue true
   */
  padding?: boolean;
  /**
   * Set the max height of the content after which the scrollbar will appear.
   */
  contentMaxHeight?: string;
  /**
   * Set the dimension of the summary toggle
   *
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set the icon to be displayed when the disclosure is closed.
   * @defaultValue "ctrl-right"
   */
  closedIcon?: IconProps['source'];
  /**
   * Set the icon to be displayed when the disclosure is open.
   * @defaultValue "ctrl-down"
   */
  openIcon?: IconProps['source'];
  /**
   * Set the position of the icon indicator. The content padding is automatically
   * applied based on the icon position.
   *
   * @defaultValue "start"
   */
  iconPosition?: 'start' | 'end';
  /**
   * Set or disable the interactivity of the summary toggle.
   * Eg. If `open` is set to `true` the content can't be toggled.
   *
   * @defaultValue true
   */
  expandable?: boolean;
  /**
   * Callback fired when the disclosure is toggled.
   * @param open the current state of the disclosure
   * @returns void
   */
  onToggle?: (open: boolean) => void;
};

type SizesType = Record<
  NonNullable<DisclosureProps['dimension']>,
  {
    summary: TextProps['size'];
    icon: IconProps['dimension'];
  }
>;

const sizes: SizesType = {
  small: {
    summary: 16,
    icon: 16,
  },
  regular: {
    summary: 18,
    icon: 18,
  },
  big: {
    summary: 22,
    icon: 24,
  },
};

export const Disclosure: FC<DisclosureProps> = ({
  children,
  open = false,
  padding = true,
  className,
  summary,
  closedIcon = 'plus',
  openIcon = 'minus',
  contentMaxHeight,
  dimension = 'regular',
  iconPosition = 'start',
  expandable = true,
  style,
  onToggle,
  ref: forwardedRef,
  ...otherProps
}) => {
  const ref = useRef<HTMLDetailsElement>(null);

  useImperativeHandle(forwardedRef, () => ref.current as HTMLDetailsElement);

  const [isOpen, setIsOpen] = useState<boolean>(open);
  const uid = useId();

  useEffect(() => {
    if (ref.current) {
      ref.current.open = open;
    }
  }, [open]);

  const handleOpen = useCallback(
    (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      const hasOpenState = event.currentTarget.open;
      if (expandable) {
        setIsOpen(hasOpenState);
        onToggle?.(hasOpenState);
      }
    },
    [expandable, onToggle],
  );

  const dynamicStyle = useMemo(
    () => ({
      '--max-height': contentMaxHeight,
    }),
    [contentMaxHeight],
  );

  return (
    <details
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.Disclosure, className)}
      data-disclosure-icon-position={iconPosition}
      data-disclosure-dimension={dimension}
      data-disclosure-expandable={expandable}
      onToggle={handleOpen}
      ref={ref}
      open={isOpen}
      {...otherProps}
    >
      <Text
        as="summary"
        className={styles.Summary}
        responsive={false}
        id={`${uid}-disclosure`}
        size={dimension ? sizes[dimension].summary : undefined}
        weight="bold"
      >
        {summary}
        {expandable && (
          <div className={styles.ExpandIcon}>
            <Interpolator
              duration={100}
              interpolating={isOpen}
              enterComponent={<Icon source={openIcon} dimension={sizes[dimension].icon} />}
              enterRotation="-45deg"
              enterScale={[1, 1]}
              exitComponent={<Icon source={closedIcon} dimension={sizes[dimension].icon} />}
              exitScale={[1, 1]}
              exitRotation="45deg"
            />
          </div>
          // <Icon
          //   className={styles.ExpandIcon}
          //   source="ctrl-right"
          //   dimension={sizes[dimension].icon}
          // />
        )}
      </Text>
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          data-disclosure-padding={padding}
          data-disclosure-height={Boolean(contentMaxHeight)}
          animate={
            isOpen
              ? { y: 5, opacity: 1, height: 'auto' }
              : {
                  y: 0,
                  opacity: 0,
                  height: 0,
                  overflow: 'hidden',
                }
          }
          transition={{ ease: 'easeOut', duration: 0.1, delay: 0 }}
          initial={false}
          role="region"
          aria-labelledby={`${uid}-disclosure`}
        >
          {children}
        </m.div>
      </LazyMotion>
    </details>
  );
};
