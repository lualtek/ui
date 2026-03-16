# Component Anatomy & Conventions

> Reference for understanding how components are structured in `@lualtek/react-components`.

## File Structure

### Simple Component

```
button/
├── button.tsx              # Component implementation
├── button.module.css       # Scoped styles (CSS Module)
├── button.module.css.d.ts  # Auto-generated types for CSS classes
├── button.stories.tsx      # Storybook stories
└── index.ts                # Barrel export (types + component)
```

### Compound Component (co-located files)

```
popover/
├── popover.tsx             # Root component
├── popover-trigger.tsx     # Subcomponent
├── popover-content.tsx     # Subcomponent
├── popover-anchor.tsx      # Subcomponent
├── popover-close.tsx       # Subcomponent
├── popover-portal.tsx      # Subcomponent
├── popover.stories.tsx
└── index.ts                # Exports all types & components
```

### Compound Component (sub-folders)

```
menu/
├── menu.tsx                # Root component
├── menu.module.css
├── menu.module.css.d.ts
├── menu.stories.tsx
├── menu-item/
│   ├── menu-item.tsx
│   ├── menu-item.module.css
│   ├── menu-item.module.css.d.ts
│   └── index.ts
├── menu-separator/
│   ├── menu-separator.tsx
│   └── index.ts
└── index.ts
```

## Barrel Exports (index.ts)

Always export both the type and the component:

```typescript
// Simple component
export type { ButtonProps } from './button';
export { Button } from './button';

// Compound component — export subcomponent types too
export type { PopoverProps } from './popover';
export { Popover } from './popover';
export type { PopoverContentProps } from './popover-content';
export { PopoverContent } from './popover-content';
```

The top-level `src/components/index.ts` re-exports everything from each component folder.

## Props Definition

### Standard Pattern

Extend native HTML attributes via `React.ComponentPropsWithRef<'element'>`, then add component-specific props:

```typescript
export type ChipProps = React.ComponentPropsWithRef<'button'> & {
  /**
   * Set the dimension of the component.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * The color of the chip.
   * @defaultValue "primary"
   */
  color?: TokensTypes['colors'];
  dismissable?: boolean;
  interactive?: boolean;
  icon?: IconProps['source'];
};
```

**Rules:**

- Always use `React.ComponentPropsWithRef<'element'>` (not `HTMLAttributes`)
- Add JSDoc comments with `@defaultValue` for every optional prop that has a default
- Use specific types from the design system (`TokensTypes['space']`, `IconProps['source']`) instead of `string`

### Polymorphic Pattern

For components that can render as different HTML elements:

```typescript
type ButtonComponent = PolyRefComponent<'button', ButtonProps>;
```

`PolyRefComponent` (from `src/types/polymorphic/`) enables the `as` prop:

```tsx
<Button as="a" href="/link">
  Link styled as button
</Button>
```

## Component Implementation

### Simple Functional Component

```typescript
'use client';

import { type FC, useMemo, type Ref } from 'react';
import clsx from 'clsx';
import styles from './chip.module.css';

export const Chip: FC<ChipProps> = ({
  className,
  style,
  children,
  dimension = 'regular',
  color = 'primary',
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--background': `var(--highlight-${color}-background)`,
      '--foreground': `var(--highlight-${color}-foreground)`,
    }),
    [color],
  );

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.Chip, className)}
      data-chip-dimension={dimension}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </span>
  );
};
```

**Key conventions:**

- `'use client'` directive at the top (Next.js RSC compatibility)
- Destructure all props explicitly with defaults inline
- `ref: forwardedRef` — React 19 style (no `forwardRef` wrapper)
- `clsx` for merging class names
- `useMemo` for computed styles and derived props
- Spread `...otherProps` last on the root element
- Data attributes for variants (`data-chip-dimension`)
- CSS custom properties for dynamic values

### Polymorphic Component

```typescript
'use client';

export const Button: ButtonComponent = ({
  as: Component = 'button',
  kind = 'primary',
  dimension = 'regular',
  className,
  children,
  disabled,
  type = 'button',
  ref: forwardedRef,
  ...otherProps
}) => {
  return (
    <Component
      ref={forwardedRef}
      type={Component === 'button' ? type : undefined}
      className={clsx(styles.Button, className)}
      data-button-kind={kind}
      data-button-dimension={dimension}
      aria-disabled={disabled}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
```

### Compound Component

```typescript
'use client';

type PopoverComponentProps = FC<PopoverProps> & {
  Anchor: typeof PopoverAnchor;
  Close: typeof PopoverClose;
  Content: typeof PopoverContent;
  Portal: typeof PopoverPortal;
  Trigger: typeof PopoverTrigger;
};

export const Popover: PopoverComponentProps = ({ children, ...otherProps }) => (
  <PopoverPrimitive.Root {...otherProps}>{children}</PopoverPrimitive.Root>
);

// Assign subcomponents as static properties
Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;
Popover.Anchor = PopoverAnchor;
Popover.Close = PopoverClose;
Popover.Portal = PopoverPortal;
```

Usage: `<Popover.Trigger>`, `<Popover.Content>`, etc.

## CSS & Styling

### CSS Modules

All component styles use CSS Modules (`.module.css`). Type definition files (`.module.css.d.ts`) are auto-generated:

```typescript
declare const styles: {
  readonly Button: string;
  readonly SpinnerIndicator: string;
};
export = styles;
```

### Data-Attribute Styling

Component variants are driven by data attributes, not CSS class toggles:

```css
@layer components {
  .Button {
    /* Base styles */
    display: inline-flex;
    cursor: pointer;

    /* Variant: dimension */
    &[data-button-dimension='big'] {
      block-size: --token(--space-48);
      font-size: --token(--font-size-18);
      border-radius: --token(--radius-16);
    }

    /* Variant: kind */
    &[data-button-kind='primary'] {
      --foreground: var(--highlight-brand-foreground);
      --background: var(--vibrancy-background-brand);
    }
  }
}
```

### Token Usage in CSS

Use the `--token()` PostCSS function to reference design tokens:

```css
padding: 0 --token(--space-8);
border-radius: --token(--radius-full);
font-size: --token(--font-size-16);
block-size: --token(--space-24);
```

The `--token()` function is resolved at build time by PostCSS (see `packages/config/src/postcss/config-object.ts`). It reads from `@lualtek/tokens/web/tokens-flat.json`.

### Token Usage in JS

Import the JSON tokens for runtime values:

```typescript
import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';

// Use TokensTypes for prop types
interface ListProps {
  rowGap?: TokensTypes['space']; // e.g., 2 | 4 | 8 | 16 | 24 | ...
  columnGap?: TokensTypes['space'];
}

// Use tkns for runtime values
const gap = tkns.space[8]; // Actual rem value
```

### Dynamic Styling

CSS custom properties set via inline `style` prop, consumed in CSS:

```typescript
// In component TSX:
const dynamicStyle = useMemo(
  () => ({
    '--background': `var(--highlight-${color}-background)`,
    '--foreground': `var(--highlight-${color}-foreground)`,
  }),
  [color],
);
return <div style={{ ...dynamicStyle, ...style }} />;
```

```css
/* In component CSS: */
.Chip {
  color: var(--foreground);
  background: var(--background);
}
```

### CSS Layers

All component CSS must be wrapped in `@layer components`:

```css
@layer components {
  .MyComponent {
    /* ... */
  }
}
```

Layer order is defined in `src/core.css`:

```css
@layer core, utilities, plain-components, components, overrides, themes;
```

## Layout Primitives

Components use these layout primitives from the library itself:

| Component   | Purpose                            | Key Props                                                                         |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| `Stack`     | Flex container (column by default) | `direction`, `rowGap`, `columnGap`, `vAlign`, `hAlign`, `wrap`, `fill`, `padding` |
| `Grid`      | CSS Grid container                 | `columns`, `gap`, `rowGap`, `columnGap`                                           |
| `Container` | Max-width wrapper                  | `dimension`                                                                       |
| `Masonry`   | Masonry layout                     | `columns`, `gap`                                                                  |
| `Bleed`     | Negative margin utility            | `horizontal`, `vertical`                                                          |

`Stack` is the most commonly used. It's polymorphic (`as` prop) and accepts `TokensTypes['space']` for gap/padding values.

## Shared Hooks

### `useStyles`

Returns data attributes and style objects for elevation and vibrancy effects:

```typescript
const { elevation, vibrancy } = useStyles({
  elevation: { resting: 2, onHover: 3 },
  vibrancy: { blur: 'soft', color: 'brand' },
});

// Apply: {...elevation.attributes} {...elevation.style}
// Apply: {...vibrancy.attributes}
```

### `useResponsiveContext`

Provides breakpoint matches. Requires `<ResponsiveProvider>` ancestor:

```typescript
const { matches } = useResponsiveContext();
// matches.small, matches.medium, matches.large, etc. → boolean
```

Uses breakpoint values from `@lualtek/tokens/web/tokens.json`.

## Storybook Stories

Stories use Storybook v8+ with `@storybook/react-vite`:

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: {
    children: 'Click me',
    kind: 'primary',
    dimension: 'regular',
  },
  argTypes: {
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { kind: 'secondary' },
};
```

**Conventions:**

- Use `satisfies Meta<typeof Component>` (not `as`)
- `StoryObj<typeof meta>` for story type
- Title follows `Category/ComponentName` pattern
- Stories are located in the component folder as `component-name.stories.tsx`

## Charts Package

The `@lualtek/charts` package (`packages/charts/`) contains chart components built on [recharts](https://recharts.org/). It follows the same general conventions as `react-components`:

- Components in `src/components/`: `bar-chart`, `line-chart`, `base-chart`, `brush`, `tooltip`
- TypeScript path alias: `@/charts/*`
- Uses `@lualtek/tokens` for type definitions
- Fixtures in `fixtures/` for sample chart data
- Has its own TypeDoc config (`typedoc.json`) for API docs

Charts components wrap recharts primitives with consistent styling and token integration, similar to how react-components wraps Radix UI primitives.
