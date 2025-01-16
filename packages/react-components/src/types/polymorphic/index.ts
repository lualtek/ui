/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type */

// A more precise version of just React.ComponentPropsWithoutRef on its own
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref']

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
type PolymorphicPropsRef<
  T extends React.ElementType = React.ElementType,
  TProps = {},
> = {
  as?: T extends '' ? { as: keyof JSX.IntrinsicElements } : T;
}
& TProps
& Omit<PropsOf<T>, keyof TProps | 'as' | 'ref' | 'forwardedRef'> & { ref?: PolymorphicRef<T> }

export type { PolymorphicPropsRef, PropsOf };
