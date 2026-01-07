export type Themes = 'light' | 'dark' | 'auto'

export type UIComponent<Props, Other = Record<string, unknown>> = {
  theme: Themes;
} & Other & Props

export type UIComponentWithChildren<Props, Other = Record<string, unknown>> = {
  theme: Themes;
} & Other & React.PropsWithChildren<UIComponent<Props>>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & Record<string, unknown>

