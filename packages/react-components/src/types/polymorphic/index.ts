/* eslint-disable @typescript-eslint/naming-convention */
import {
  ComponentPropsWithRef, ElementType, ForwardRefExoticComponent, ReactElement,
} from 'react';

/**
 * Utility type to merge two types, with properties from the second type overriding those from the first type.
 * @template P1 - The first type.
 * @template P2 - The second type.
 */
type Merge<P1 = Record<string, unknown>, P2 = Record<string, unknown>> = Omit<P1, keyof P2> & P2;

/**
 * Utility type to merge props of a given element type with additional props.
 * @template E - The element type.
 * @template P - Additional props.
 */
type MergeProps<E, P = Record<string, unknown>> = P
  & Merge<E extends ElementType ? ComponentPropsWithRef<E> : never, P>;

/**
 * Interface for a polymorphic component with a ref.
 * @template IntrinsicElementString - The intrinsic element type as a string.
 * @template OwnProps - Additional props for the component.
 */
export interface PolyRefComponent<IntrinsicElementString, OwnProps = Record<string, unknown>>
  extends ForwardRefExoticComponent<
    MergeProps<IntrinsicElementString, OwnProps & { as?: IntrinsicElementString }>
  > {
  /**
   * Polymorphic component that can render as any intrinsic element.
   * @template As - The intrinsic element type.
   * @param props - The props for the component.
   * @returns A React element or null.
   */
  <As extends keyof JSX.IntrinsicElements>(props: MergeProps<As, OwnProps & { as: As }>): ReactElement | null;

  /**
   * Polymorphic component that can render as any custom element type.
   * @template As - The custom element type.
   * @template _AsWithProps - The inferred props for the custom element type.
   * @param props - The props for the component.
   * @returns A React element or null.
   */
  <As extends ElementType<unknown>, _AsWithProps = As extends ElementType<infer P> ? ElementType<P> : never>(
    props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>,
  ): ReactElement | null;
}
