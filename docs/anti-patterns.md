# Anti-Patterns

> Things to avoid when working in this codebase. Each anti-pattern includes the wrong approach and the correct alternative.

---

## Don't use inline styles for token values

Token values should be consumed through `--token()` in CSS, not hardcoded in style props.

```typescript
// ❌ Wrong — hardcoded pixel values
<div style={{ padding: '16px', borderRadius: '8px' }} />

// ❌ Wrong — importing tokens just for inline styles
import tkns from '@lualtek/tokens/web/tokens.json';
<div style={{ padding: tkns.space[16] }} />

// ✅ Correct — use CSS with --token()
// component.module.css:
// .Component { padding: --token(--space-16); border-radius: --token(--radius-8); }
<div className={styles.Component} />
```

**Why:** `--token()` is resolved at build time by PostCSS. Inline styles bypass the token system, create inconsistencies, and can't benefit from theme changes.

**Exception:** Dynamic CSS custom properties set via `style` (e.g., `--my-color: var(--highlight-${color}-foreground)`) are fine — they're consumed by CSS, not used directly.

---

## Don't create class names from props

Don't build class names dynamically from prop values. Use data attributes instead.

```typescript
// ❌ Wrong — conditional class names for variants
<div className={clsx(
  styles.Button,
  dimension === 'big' && styles.ButtonBig,
  kind === 'primary' && styles.ButtonPrimary,
)} />

// ✅ Correct — data attributes
<div
  className={styles.Button}
  data-button-dimension={dimension}
  data-button-kind={kind}
/>
```

```css
/* ✅ Correct CSS */
.Button {
  &[data-button-dimension='big'] {
    /* ... */
  }
  &[data-button-kind='primary'] {
    /* ... */
  }
}
```

**Why:** Data attributes are visible in the DOM inspector for debugging, prevent invalid class combinations, and keep component logic minimal.

---

## Don't skip the `'use client'` directive

Every component file that uses React hooks, event handlers, or browser APIs must have `'use client'` at the top.

```typescript
// ❌ Wrong — missing directive
import { useState } from 'react';
export const Counter = () => {
  /* ... */
};

// ✅ Correct
('use client');

import { useState } from 'react';
export const Counter = () => {
  /* ... */
};
```

**Why:** This library supports Next.js App Router. Without `'use client'`, components are treated as Server Components and will error if they use client-side APIs.

---

## Don't use `React.forwardRef`

This repo uses React 19, which supports `ref` as a regular prop. Don't wrap components in `forwardRef`.

```typescript
// ❌ Wrong — React 18 pattern
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);

// ✅ Correct — React 19 pattern
export const Input: FC<InputProps> = ({
  ref: forwardedRef,
  ...otherProps
}) => <input ref={forwardedRef} {...otherProps} />;
```

**Why:** `forwardRef` is unnecessary in React 19. Destructure `ref: forwardedRef` directly from props.

---

## Don't export components without exporting their types

Every component's `index.ts` must export both the type and the component.

```typescript
// ❌ Wrong — missing type export
export { Button } from './button';

// ✅ Correct
export type { ButtonProps } from './button';
export { Button } from './button';
```

**Why:** Consumers need the prop types for type-safe composition, wrapper components, and documentation generation (TypeDoc).

---

## Don't skip JSDoc and `@defaultValue` on props

Every optional prop with a default value must document it.

```typescript
// ❌ Wrong — no documentation
type ButtonProps = {
  kind?: 'primary' | 'secondary' | 'flat';
  dimension?: 'small' | 'regular' | 'big';
};

// ✅ Correct
type ButtonProps = {
  /**
   * The visual style of the button.
   * @defaultValue "primary"
   */
  kind?: 'primary' | 'secondary' | 'flat';
  /**
   * The size of the button.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
};
```

**Why:** JSDoc comments power Storybook's auto-generated documentation and TypeDoc API docs. Missing `@defaultValue` forces consumers to read implementation code.

---

## Don't use pixel values for spacing

All spacing should use the token scale, not arbitrary pixel values.

```css
/* ❌ Wrong — arbitrary px values */
.Component {
  padding: 12px;
  gap: 6px;
  margin-bottom: 20px;
}

/* ✅ Correct — token scale */
.Component {
  padding: --token(--space-12);
  gap: --token(--space-8);
  margin-block-end: --token(--space-24);
}
```

**Why:** The spacing scale ensures visual consistency across the design system. Arbitrary values create subtle misalignments.

---

## Don't bypass the CSS layer system

All component styles must be wrapped in `@layer components`. Don't write bare selectors.

```css
/* ❌ Wrong — no layer wrapper */
.MyComponent {
  background: red;
}

/* ✅ Correct */
@layer components {
  .MyComponent {
    background: var(--highlight-danger-background);
  }
}
```

**Why:** The layer order (`core → utilities → plain-components → components → overrides → themes`) controls the cascade. Bare selectors have higher specificity than layered styles and break the system.

---

## Don't detect theme in JavaScript

Don't use `prefers-color-scheme` media queries in JS or store theme state in React. The CSS handles it.

```typescript
// ❌ Wrong — runtime theme detection
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const bgColor = isDark ? '#1a1a1a' : '#ffffff';

// ❌ Wrong — conditional token usage
const bg = theme === 'dark' ? tkns.color.primary[80] : tkns.color.primary[20];

// ✅ Correct — use semantic CSS variables
// The theme system auto-resolves via CSS light-dark():
// .Component { background: var(--global-background); }
```

**Why:** Themes use the CSS `light-dark()` function, which switches automatically based on `color-scheme`. JS detection creates flash-of-wrong-theme and duplicates logic.

---

## Don't create context providers without `constate`

This library uses `constate` for lightweight context creation. Don't hand-roll `React.createContext` + Provider patterns.

```typescript
// ❌ Wrong — manual context boilerplate
const MyContext = React.createContext<Value | null>(null);
export const MyProvider = ({ children }) => {
  const value = useMyHook();
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
export const useMyContext = () => {
  const ctx = React.useContext(MyContext);
  if (!ctx) throw new Error('Missing provider');
  return ctx;
};

// ✅ Correct — constate
import constate from 'constate';

const useMyHook = () => {
  // hook logic
  return { /* values */ };
};

export const [MyProvider, useMyContext] = constate(useMyHook);
```

**Why:** `constate` eliminates the boilerplate, handles the null-check automatically, and allows splitting a single hook into multiple optimized selectors.

---

## Don't add dependencies without checking token/theme coverage

Before installing a new package for colors, spacing, shadows, animations, or breakpoints, check if the design system already provides it.

```typescript
// ❌ Wrong — installing a color library
import { lighten } from 'polished';
const hoverColor = lighten(0.1, '#3b82f6');

// ✅ Correct — use existing highlight/dimmed tokens
// CSS: background: var(--highlight-brand-background);

// ❌ Wrong — installing an animation library for simple transitions
import { motion } from 'framer-motion';

// ✅ Correct — use token-based CSS transitions
// CSS: transition: opacity --token(--duration-200) ease-out;
```

**Tokens already cover:** colors, spacing, typography, border radii, shadows (elevation), blur (vibrancy), animation durations, breakpoints, and container sizes.

---

## Don't use `React.HTMLAttributes` for prop types

Always use `React.ComponentPropsWithRef<'element'>` to include the `ref` prop.

```typescript
// ❌ Wrong — missing ref support
type Props = React.HTMLAttributes<HTMLDivElement> & {
  /* ... */
};

// ✅ Correct — includes ref
type Props = React.ComponentPropsWithRef<'div'> & {
  /* ... */
};
```

**Why:** `ComponentPropsWithRef` includes the `ref` prop type, which is needed for React 19's ref-as-prop pattern. `HTMLAttributes` omits it.
