import clsx from 'clsx';
import {
  domMax, LazyMotion, m,
} from 'motion/react';
import {
  ComponentPropsWithRef, FC, useCallback, useId, useMemo, useState,
} from 'react';

import {
  Button, Elevator, Stack, StackProps,
} from '@/components';

import styles from './expander.module.css';

export type ExpanderProps = ComponentPropsWithRef<'div'> & {
  /**
   * Set the expand button label when is collapsed
   *
   * @defaultValue 'Show more'
   */
  expandLabel?: string;
  /**
   * Set the expand button label when is expanded
   *
   * @defaultValue 'Show less'
   */
  collapseLabel?: string;
  /**
   * Set the size area for the visible content
   *
   * @defaultValue '100px'
   */
  visibleArea?: string;
  /**
   * Set the component to be expanded by default
   *
   * @defaultValue false
   */
  expanded?: boolean;
  /**
   * Set the alignment of the expand button relative to the content
   *
   * @defaultValue 'center'
   */
  expandAlignment?: StackProps['hAlign'];
}

export const Expander: FC<ExpanderProps> = ({
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  visibleArea = '100px',
  expandAlignment = 'center',
  expanded = false,
  style,
  className,
  children,
  ...otherProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!expanded);
  const uid = useId();

  const dynamicStyle = useMemo(() => ({
    '--visibleArea': visibleArea,
  }), [visibleArea]);

  const handleCollapse = useCallback(
    () => {
      setIsCollapsed(s => !s);
    },
    [],
  );

  return (
    <div
      style={{ ...dynamicStyle, style }}
      className={clsx(styles.Expander, className)}
      data-expander-collapsed={isCollapsed}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          id={uid}
          animate={!isCollapsed ? { height: 'auto' } : {
            height: 'calc(var(--visibleArea) + var(--white-space))', overflow: 'hidden',
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          initial={false}
        >
          {children}
        </m.div>
      </LazyMotion>
      <Stack className={styles.Action} hAlign={expandAlignment} vAlign="center" fill={false}>
        <Elevator resting={isCollapsed ? 4 : 0}>
          <Button
            iconPosition="end"
            aria-expanded={!isCollapsed}
            aria-controls={uid}
            onClick={handleCollapse}
          >
            {isCollapsed ? expandLabel : collapseLabel}
          </Button>
        </Elevator>
      </Stack>
    </div>
  );
};
