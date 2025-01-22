/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
export type PropsWithClass<P = Record<string, unknown>> = {
  style?: React.CSSProperties;
  className?: string;
} & P

/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
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

/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
export type FCChildren<P = Record<string, unknown>> = React.FC<React.PropsWithChildren<P>>
/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
export type FCChildrenClass<P = Record<string, unknown>> = FCChildren<PropsWithClass<P>>
/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
export type FCForwardRef<P = Record<string, unknown>> = React.ForwardRefExoticComponent<PropsWithClass<P>>
/**
 *
 * @deprecated This type is no more necessary and will be removed in the future
 * @see React.ComponentPropsWithRef<Tagname>
 * @see React.ComponentPropsWithoutRef<Tagname>
 *
 */
export type PropsClassChildren<P = Record<string, unknown>> = React.PropsWithChildren<PropsWithClass<P>>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & Record<string, unknown>

