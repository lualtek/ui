import {
  ComponentPropsWithRef, ElementType, ForwardRefExoticComponent, ReactElement,
} from 'react';

type Merge<P1 = Record<string, unknown>, P2 = Record<string, unknown>> = Omit<P1, keyof P2> & P2;
type MergeProps<E, P = Record<string, unknown>> = P
  & Merge<E extends ElementType ? ComponentPropsWithRef<E> : never, P>;

export interface PolyRefComponent<IntrinsicElementString, OwnProps = Record<string, unknown>>
  extends ForwardRefExoticComponent<
    MergeProps<IntrinsicElementString, OwnProps & { as?: IntrinsicElementString }>
  > {
  <As extends keyof JSX.IntrinsicElements>(props: MergeProps<As, OwnProps & { as: As }>): ReactElement | null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  <As extends ElementType<unknown>, _AsWithProps = As extends ElementType<infer P> ? ElementType<P> : never>(
    props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>,
  ): ReactElement | null;
}
