'use client';

import clsx from 'clsx';
import {
  domMax, LazyMotion, m,
} from 'framer-motion';
import {
  CSSProperties,
  DetailsHTMLAttributes,
  forwardRef,
  ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState,
} from 'react';

import {
  Icon, IconProps, Text, TextProps,
} from '@/components';

import styles from './disclosure.module.css';

export type DisclosureProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
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
}

type SizesType = Record<NonNullable<DisclosureProps['dimension']>, {
  summary: TextProps['size'];
  icon: IconProps['dimension'];
}>

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

export const Disclosure = forwardRef<HTMLDetailsElement, DisclosureProps>(({
  children,
  open = false,
  padding = true,
  className,
  summary,
  contentMaxHeight,
  dimension = 'regular',
  iconPosition = 'start',
  expandable = true,
  style,
  onToggle,
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const uid = useId();

  useEffect(() => {
    if (ref.current) {
      ref.current.open = open;
    }
  }, [expandable, open]);

  const handleOpen = useCallback(
    () => () => {
      if (ref.current && expandable) setIsOpen(open || ref.current.open);
      if (expandable && open === undefined) onToggle?.(open || ref.current.open);
    },
    [expandable, onToggle, open],
  );

  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--max-height': contentMaxHeight,
    }
  ), [contentMaxHeight]);

  return (
    <details
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.Disclosure, className)}
      data-disclosure-icon-position={iconPosition}
      data-disclosure-dimension={dimension}
      data-disclosure-expandable={expandable}
      onToggle={handleOpen()}
      ref={ref}
      open={isOpen}
      {...otherProps}
    >
      <Text
        as="summary"
        responsive={false}
        className={styles.Summary}
        id={`${uid}-disclosure`}
        size={dimension ? sizes[dimension].summary : undefined}
        weight="bold"
      >
        {summary}
        {expandable && (
          <Icon
            className={styles.ExpandIcon}
            source="ctrl-right"
            dimension={sizes[dimension].icon}
          />
        )}
      </Text>
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          data-disclosure-padding={padding}
          data-disclosure-height={Boolean(contentMaxHeight)}
          animate={isOpen ? { y: 5, opacity: 1, height: 'auto' } : {
            y: 0, opacity: 0, height: 0, overflow: 'hidden',
          }}
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
});

Disclosure.displayName = 'Disclosure';
