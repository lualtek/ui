import {
  ComponentPropsWithRef, ElementType, forwardRef, ForwardRefExoticComponent, ForwardRefRenderFunction, ReactElement,
} from 'react';

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type Merge<A, B> = Omit<A, keyof B> & B;
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

export type AsProps<
  Component extends ElementType,
  PermanentProps extends Record<string, unknown>,
  ComponentProps extends Record<string, unknown>,
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>;

export type PolymorphicWithRef<
  Default extends OnlyAs,
  Props extends Record<string, unknown> = Record<string, unknown>,
  OnlyAs extends ElementType = ElementType,
> = <T extends OnlyAs = Default>(props: AsProps<T, Props, ComponentPropsWithRef<T>>) => ReactElement | null;

export type PolyForwardComponent<
  Default extends OnlyAs,
  Props extends Record<string, unknown> = Record<string, unknown>,
  OnlyAs extends ElementType = ElementType,
> = Merge<
  ForwardRefExoticComponent<Merge<ComponentPropsWithRef<Default>, Props & { as?: Default }>>,
  PolymorphicWithRef<Default, Props, OnlyAs>
>;

export type PolyRefFunction = <
  Default extends OnlyAs,
  Props extends Record<string, unknown> = Record<string, unknown>,
  OnlyAs extends ElementType = ElementType,
>(
  Component: ForwardRefRenderFunction<Default, Props & { as?: OnlyAs }>,
) => PolyForwardComponent<Default, Props, OnlyAs>;

export const polymorphicForwardRef = forwardRef as PolyRefFunction;
