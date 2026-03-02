'use client';

import type { FC } from 'react';
import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

export type StickySpyProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set a custom name for the attribute
   * @defaultValue "data-react-is-sticky"
   */
  attribute?: string;
  /**
   * Callback function that is called when the sticky element changes
   */
  onStickyChange?: (isSticky: boolean) => void;
  /**
   * Set the root element to observe. Must be a sticky element's ancestor.
   */
  root?: HTMLElement;
};

export const StickySpy: FC<StickySpyProps> = ({
  children,
  onStickyChange,
  attribute = 'data-react-is-sticky',
  root,
}) => {
  const defaultRoot = useMemo(() => root ?? (typeof document !== 'undefined' ? document : null), [root]);
  const spyRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const uid = useId();

  useEffect(() => {
    const spy = spyRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
        onStickyChange?.(!entry.isIntersecting);
      },
      {
        root: defaultRoot,
      },
    );

    if (spy) {
      observer.observe(spy);
    }

    return () => (spy ? observer.unobserve(spy) : undefined);
  }, [children, spyRef, onStickyChange, defaultRoot]);

  return (
    <Fragment key={uid}>
      <div ref={spyRef} data-react-sticky-spy style={{ height: 0, width: 1 }} />
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child, { [attribute]: isSticky }) : child,
      )}
    </Fragment>
  );
};
