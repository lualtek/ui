/* eslint-disable no-unused-vars */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

/**
 * Default CSS definition for typescript
 */
declare module 'csstype' {
  type Properties = Record<string, any>;
}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

type PropsWithClass<P = Record<string, unknown>> = {
  style?: Record<string, any>;
  className?: string;
} & P

type FCClass<T = Record<string, unknown>> = React.FC<{
  style?: Record<string, any>;
  className?: string;
} & T>

type FCChildren<P = Record<string, unknown>> = React.FC<React.PropsWithChildren<P>>

type FCChildrenClass<P = Record<string, unknown>> = FCChildren<PropsWithClass<P>>

type FCForwardRef<P = Record<string, unknown>> = React.ForwardRefExoticComponent<PropsWithClass<P>>

type PropsClassChildren<P = Record<string, unknown>> = React.PropsWithChildren<PropsWithClass<P>>
