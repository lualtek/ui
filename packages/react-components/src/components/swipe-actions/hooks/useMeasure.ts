import { useEffect, useRef, useState } from 'react';

/**
 * A custom React hook that measures the width of a given HTML element and returns both
 * a callback ref setter and the measured width of the element.
 *
 * @template T The type of the HTML element to measure.
 *
 * @returns {[ (el: T | null) => void, number ]}
 *   A tuple where:
 *   - The first element is a callback ref setter function to attach to the target element.
 *   - The second element is the current width of the target element.
 *
 * @remarks
 * This hook internally uses the ResizeObserver API to observe changes in the width
 * of the provided target element. The ref setter function should be passed to the `ref`
 * property of the target element in order to initiate measurement.
 */
export const useMeasure = <T extends HTMLElement>(): [(el: T | null) => void, number] => {
  const [width, setWidth] = useState(0);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const setRef = (el: T | null) => {
    ref.current = el;
  };

  return [setRef, width];
};
