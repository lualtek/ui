export type PropsWithClass<P = Record<string, unknown>> = {
  style?: Record<string, any>;
  className?: string;
} & P

export type FCClass<T = Record<string, unknown>> = React.FC<{
  style?: Record<string, any>;
  className?: string;
} & T>

export type FCChildren<P = Record<string, unknown>> = React.FC<React.PropsWithChildren<P>>

export type FCChildrenClass<P = Record<string, unknown>> = FCChildren<PropsWithClass<P>>

export type FCForwardRef<P = Record<string, unknown>> = React.ForwardRefExoticComponent<PropsWithClass<P>>

export type PropsClassChildren<P = Record<string, unknown>> = React.PropsWithChildren<PropsWithClass<P>>
