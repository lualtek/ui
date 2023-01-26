import {
  RefObject, useCallback, useEffect, useState,
} from 'react';
import { useForkRef, useMutationObserverRef } from 'rooks';

/**
 * @param element HTML element whose boundingclientrect is needed
 * @returns DOMRect
 */
function getBoundingClientRect(element: SVGSVGElement): DOMRect {
  return element.getBBox();
}

function useBoundingBoxRef<T extends SVGSVGElement>(): [
  RefObject<T> | null,
  DOMRect | null,
  () => void,
] {
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [node, setNode] = useState<SVGSVGElement | null>(null);

  const update = useCallback(() => {
    setDomRect(node ? getBoundingClientRect(node) : null);
  }, [node]);

  useEffect(() => {
    update();
  }, [update]);

  const ref = useCallback((nodeElement: SVGSVGElement | null) => {
    setNode(nodeElement);
  }, []);

  const [mutationObserverRef] = useMutationObserverRef(update);

  // @ts-expect-error - there is an hardcoded type on rooks that prevents this from working
  const forkedRef = useForkRef(ref, mutationObserverRef);

  return [forkedRef as unknown as RefObject<T>, domRect, update];
}

export { useBoundingBoxRef };
