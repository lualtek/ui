/**
 * Defines the 'as' prop and potentially other props specific to the polymorphic component itself,
 * independent of the underlying element it renders.
 * @template C The element type.
 */
type PolymorphicOwnProps<C extends React.ElementType> = {
  as?: C;
  // Example: Add component-specific props here
  // color?: 'primary' | 'secondary';
};

/**
 * The core type for polymorphic component props.
 * Merges OwnProps with the props of the underlying element (including ref),
 * ensuring OwnProps take precedence in case of naming conflicts.
 * @template C The target element type (e.g., 'button', 'a', typeof CustomComponent).
 * @template OwnProps Additional props specific to the polymorphic component.
 */
export type PolymorphicProps<
  C extends React.ElementType,
  OwnProps = Record<string, unknown>, // Allows passing component-specific props externally if needed
> = OwnProps & // Include the component's own specific props
  PolymorphicOwnProps<C> & // Include the 'as' prop definition
  Omit<
    React.ComponentPropsWithRef<C>, // Get all props of the underlying element C, including 'ref'
    keyof (OwnProps & PolymorphicOwnProps<C>) // Omit any props from element C that conflict with OwnProps or 'as'
  >;

/**
 * Defines the signature for a polymorphic functional component.
 * @template DefaultElement The default HTML element tag to render if 'as' is not provided.
 * @template OwnProps The type of the component's own specific props.
 */
export type PolyRefComponent<
  DefaultElement extends React.ElementType,
  OwnProps = Record<string, unknown>,
> = <C extends React.ElementType = DefaultElement>( // The component function is generic
  props: PolymorphicProps<C, OwnProps> // Props are typed using the core PolymorphicProps type
) => React.ReactElement | null; // Standard React component return type
