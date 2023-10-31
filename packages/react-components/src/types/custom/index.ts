export type PropsWithClass<P = Record<string, unknown>> = {
  style?: React.CSSProperties;
  className?: string;
} & P

export type FCClass<T = Record<string, unknown>> = React.FC<{
  style?: React.CSSProperties;
  className?: string;
} & T>

export type Themes = 'light' | 'dark' | 'auto'

export type UIComponent<Props, Other = Record<string, unknown>> = {
  theme: Themes;
} & Other & PropsWithClass<Props>

export type UIComponentWithChildren<Props, Other = Record<string, unknown>> = {
  theme: Themes;
} & Other & React.PropsWithChildren<UIComponent<Props>>

export type FCChildren<P = Record<string, unknown>> = React.FC<React.PropsWithChildren<P>>

export type FCChildrenClass<P = Record<string, unknown>> = FCChildren<PropsWithClass<P>>

export type FCForwardRef<P = Record<string, unknown>> = React.ForwardRefExoticComponent<PropsWithClass<P>>

export type PropsClassChildren<P = Record<string, unknown>> = React.PropsWithChildren<PropsWithClass<P>>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & Record<string, unknown>

