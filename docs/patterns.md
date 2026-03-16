# Design Patterns

> Recommended patterns for building and extending components in this design system.

## Compound Component Pattern

Use the compound component pattern when a component has multiple related sub-parts that share state or context. Assign subcomponents as static properties on the root component.

```typescript
type MenuComponent = FC<MenuProps> & {
  Item: typeof MenuItem;
  Separator: typeof MenuSeparator;
};

export const Menu: MenuComponent = ({ children, ...props }) => (
  <MenuRoot {...props}>{children}</MenuRoot>
);

Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;
```

**When to use:** Popover, Menu, Tabs, Dialog, Select — any component with a trigger + content pattern or a list of typed children.

**Real examples:** `Popover`, `Menu`, `Tabs`, `Sheet`, `Toast`, `Select`

## Polymorphic Component Pattern

Use `PolyRefComponent` to allow a component to render as any HTML element or React component via the `as` prop.

```typescript
import type { PolyRefComponent } from '@/types/polymorphic';

type CardComponent = PolyRefComponent<'div', CardProps>;

export const Card: CardComponent = ({
  as: Component = 'div',
  className,
  ref: forwardedRef,
  ...otherProps
}) => (
  <Component ref={forwardedRef} className={clsx(styles.Card, className)} {...otherProps} />
);
```

**When to use:** Layout primitives, text elements, interactive elements that may be links or buttons.

**Real examples:** `Button`, `Stack`, `Text`, `Title`, `IconButton`

## Data-Attribute-Driven Styling

Instead of mapping props to CSS class names, set data attributes on the element and style them with CSS attribute selectors:

```typescript
// TSX — set data attributes from props
<div
  className={styles.Card}
  data-card-variant={variant}
  data-card-padding={padding}
/>
```

```css
/* CSS — style via attribute selectors */
@layer components {
  .Card {
    &[data-card-variant='elevated'] {
      box-shadow: var(--elevation-2);
    }
    &[data-card-variant='outlined'] {
      border: 1px solid var(--global-border);
    }
    &[data-card-padding='compact'] {
      padding: --token(--space-8);
    }
  }
}
```

**Why:** Keeps component logic minimal (no conditional class building), makes variant states visible in the DOM inspector, and naturally prevents invalid class combinations.

## CSS Custom Properties for Dynamic Theming

Set CSS custom properties via the `style` prop and consume them in CSS. This avoids generating class names per color/size value.

```typescript
const dynamicStyle = useMemo(
  () => ({
    '--card-bg': `var(--highlight-${color}-background)`,
    '--card-fg': `var(--highlight-${color}-foreground)`,
  }),
  [color],
);

return <div style={{ ...dynamicStyle, ...style }} className={styles.Card} />;
```

```css
.Card {
  background: var(--card-bg);
  color: var(--card-fg);
}
```

**When to use:** Any time a prop maps to a theme-derived color, spacing, or other token-based value.

## Token Consumption

### In CSS (build-time)

Use the `--token()` PostCSS function. It resolves to actual values at build time:

```css
.Component {
  padding: --token(--space-16);
  border-radius: --token(--radius-8);
  font-size: --token(--font-size-14);
  transition: opacity --token(--duration-200) ease-out;
}
```

### In JS (runtime)

Import the JSON tokens for runtime computation:

```typescript
import tkns from '@lualtek/tokens/web/tokens.json';

const paddingValue = tkns.space[16]; // "0.889rem"
```

### For TypeScript types

Use `TokensTypes` for strongly-typed props:

```typescript
import type { TokensTypes } from '@lualtek/tokens/web';

type Props = {
  gap?: TokensTypes['space']; // 2 | 4 | 8 | 16 | 24 | 32 | ...
  color?: TokensTypes['colors']; // 'primary' | 'brand' | ...
};
```

## CSS Layer Organization

All component styles MUST be declared within the `@layer components` block:

```css
@layer components {
  .MyComponent {
    /* all styles here */
  }
}
```

The layer order (defined in `core.css`) controls the cascade:

1. `core` — resets, base typography
2. `utilities` — utility classes
3. `plain-components` — unstyled component structures
4. `components` — styled components (this is where your component goes)
5. `overrides` — third-party overrides
6. `themes` — theme-specific overrides

## Memoization

### `useMemo` for computed styles and derived values

```typescript
const dynamicStyle = useMemo(
  () => ({
    '--r-gap': rowGap ? tkns.space[rowGap] : 0,
    '--c-gap': columnGap ? tkns.space[columnGap] : 0,
  }),
  [rowGap, columnGap],
);
```

### `useCallback` for event handlers

```typescript
const handleClick = useCallback(
  (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) onClick(event);
    if (disabled) event.preventDefault();
  },
  [disabled, onClick],
);
```

**Rule of thumb:** Memoize styles, derived props, and event handlers. Don't memoize trivial computations.

## Elevation & Vibrancy (useStyles)

Use the `useStyles` hook for elevation (shadows) and vibrancy (blur/glass) effects:

```typescript
const { elevation, vibrancy } = useStyles({
  elevation: { resting: 2, onHover: 3, direction: 'bottom' },
  vibrancy: { blur: 'soft', color: 'brand', saturation: 'high' },
});

return (
  <div
    {...elevation.attributes}
    {...vibrancy.attributes}
    style={{ ...elevation.style, ...style }}
  />
);
```

Effects are applied via `data-elevation-*` and `data-vibrancy-*` attributes, styled globally in `core/utils/elevations.css` and `core/utils/vibrancy.css`.

## Light/Dark Theming

Themes use CSS `light-dark()` function. **Do not detect theme mode in JS.** The browser handles it automatically:

```css
/* Themes output (auto-generated, don't edit): */
--global-foreground: light-dark(oklab(41.831%...), oklab(85.205%...));
```

Components simply consume the CSS variable:

```css
.Component {
  color: var(--global-foreground);
}
```

Theme is activated via `[data-theme]` attribute on a parent element (usually `<html>`):

```html
<html data-theme="auto">
  <!-- auto | light | dark -->
</html>
```

## Responsive Design

### CSS (preferred)

Use custom media queries defined in `core/utils/media.css`:

```css
@media (--medium) {
  .Component {
    /* medium breakpoint and up */
  }
}
```

### JS (when necessary)

Use `useResponsiveContext` for responsive logic in components:

```typescript
const { matches } = useResponsiveContext();

return matches.medium ? <DesktopView /> : <MobileView />;
```

Requires `<ResponsiveProvider>` as an ancestor. Breakpoint values come from `@lualtek/tokens`.

## Accessibility

Follow these accessibility patterns:

```typescript
// Disabled state: use aria-disabled instead of HTML disabled for links
<Component aria-disabled={disabled} />

// Busy state: announce to screen readers
<Button aria-busy={busy} aria-live={busy ? 'polite' : undefined} disabled={busy}>
  {children}
</Button>

// Always use semantic HTML as the default element
// Use aria labels for icon-only buttons
<IconButton aria-label="Close dialog" icon="x-mark" />
```

**Guidelines:**

- Use `aria-disabled` over HTML `disabled` when the element should remain focusable
- Set `aria-busy` + `aria-live` for loading states
- Default to semantic HTML elements (button, nav, main, etc.)
- Provide `aria-label` for icon-only interactive elements
- Use Radix UI primitives for complex patterns (dialogs, menus, popovers) — they handle focus management and ARIA attributes
