import { useEffect, useRef, useState } from 'react';

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
