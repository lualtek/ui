# Code Examples

> Full copy-paste-ready skeletons for common tasks. Adapt naming, props, and styles to your needs.

---

## 1. Create a Simple Component

A complete new component called `Tag` with all required files.

### `packages/react-components/src/components/tag/tag.tsx`

```typescript
'use client';

import { type FC, useMemo } from 'react';
import type { TokensTypes } from '@lualtek/tokens/web';
import clsx from 'clsx';

import styles from './tag.module.css';

export type TagProps = React.ComponentPropsWithRef<'span'> & {
  /**
   * The visual size of the tag.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular';
  /**
   * The color applied to the tag.
   * @defaultValue "primary"
   */
  color?: TokensTypes['colors'];
};

export const Tag: FC<TagProps> = ({
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
      '--tag-bg': `var(--highlight-${color}-background)`,
      '--tag-fg': `var(--highlight-${color}-foreground)`,
    }),
    [color],
  );

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.Tag, className)}
      data-tag-dimension={dimension}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </span>
  );
};
```

### `packages/react-components/src/components/tag/tag.module.css`

```css
@layer components {
  .Tag {
    display: inline-flex;
    align-items: center;
    gap: --token(--space-4);
    border-radius: --token(--radius-8);
    font-weight: 500;
    color: var(--tag-fg);
    background: var(--tag-bg);
    white-space: nowrap;

    &[data-tag-dimension='regular'] {
      padding: --token(--space-4) --token(--space-8);
      font-size: --token(--font-size-14);
    }

    &[data-tag-dimension='small'] {
      padding: --token(--space-2) --token(--space-4);
      font-size: --token(--font-size-12);
    }
  }
}
```

### `packages/react-components/src/components/tag/tag.module.css.d.ts`

```typescript
declare const styles: {
  readonly Tag: string;
};
export = styles;
```

### `packages/react-components/src/components/tag/index.ts`

```typescript
export type { TagProps } from './tag';
export { Tag } from './tag';
```

### `packages/react-components/src/components/tag/tag.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag';

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  args: {
    children: 'Label',
    dimension: 'regular',
    color: 'primary',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { dimension: 'small' },
};

export const Branded: Story = {
  args: { color: 'brand' },
};
```

### Register in barrel exports

Add to `packages/react-components/src/components/index.ts`:

```typescript
export * from './tag';
```

---

## 2. Create a Compound Component

A `Card` component with `Card.Header`, `Card.Body`, and `Card.Footer` subcomponents.

### `packages/react-components/src/components/card/card.tsx`

```typescript
'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { CardHeader } from './card-header';
import { CardBody } from './card-body';
import { CardFooter } from './card-footer';
import styles from './card.module.css';

export type CardProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Visual variant of the card.
   * @defaultValue "elevated"
   */
  variant?: 'elevated' | 'outlined' | 'flat';
};

type CardComponent = FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

export const Card: CardComponent = ({
  className,
  children,
  variant = 'elevated',
  ref: forwardedRef,
  ...otherProps
}) => (
  <div
    ref={forwardedRef}
    className={clsx(styles.Card, className)}
    data-card-variant={variant}
    {...otherProps}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
```

### `packages/react-components/src/components/card/card-header.tsx`

```typescript
'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

export type CardHeaderProps = React.ComponentPropsWithRef<'div'>;

export const CardHeader: FC<CardHeaderProps> = ({
  className,
  children,
  ref: forwardedRef,
  ...otherProps
}) => (
  <div ref={forwardedRef} className={clsx(styles.Header, className)} {...otherProps}>
    {children}
  </div>
);
```

### `packages/react-components/src/components/card/card-body.tsx`

```typescript
'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

export type CardBodyProps = React.ComponentPropsWithRef<'div'>;

export const CardBody: FC<CardBodyProps> = ({
  className,
  children,
  ref: forwardedRef,
  ...otherProps
}) => (
  <div ref={forwardedRef} className={clsx(styles.Body, className)} {...otherProps}>
    {children}
  </div>
);
```

### `packages/react-components/src/components/card/card-footer.tsx`

```typescript
'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

export type CardFooterProps = React.ComponentPropsWithRef<'div'>;

export const CardFooter: FC<CardFooterProps> = ({
  className,
  children,
  ref: forwardedRef,
  ...otherProps
}) => (
  <div ref={forwardedRef} className={clsx(styles.Footer, className)} {...otherProps}>
    {children}
  </div>
);
```

### `packages/react-components/src/components/card/card.module.css`

```css
@layer components {
  .Card {
    display: flex;
    flex-direction: column;
    border-radius: --token(--radius-16);
    overflow: hidden;

    &[data-card-variant='elevated'] {
      background: var(--global-background);
      box-shadow: var(--elevation-2);
    }

    &[data-card-variant='outlined'] {
      background: var(--global-background);
      border: 1px solid var(--global-border);
    }

    &[data-card-variant='flat'] {
      background: var(--dimmed-background);
    }
  }

  .Header {
    padding: --token(--space-16) --token(--space-16) --token(--space-8);
  }

  .Body {
    padding: --token(--space-8) --token(--space-16);
    flex: 1;
  }

  .Footer {
    padding: --token(--space-8) --token(--space-16) --token(--space-16);
  }
}
```

### `packages/react-components/src/components/card/card.module.css.d.ts`

```typescript
declare const styles: {
  readonly Card: string;
  readonly Header: string;
  readonly Body: string;
  readonly Footer: string;
};
export = styles;
```

### `packages/react-components/src/components/card/index.ts`

```typescript
export type { CardProps } from './card';
export { Card } from './card';
export type { CardHeaderProps } from './card-header';
export type { CardBodyProps } from './card-body';
export type { CardFooterProps } from './card-footer';
```

### Usage

```tsx
<Card variant="elevated">
  <Card.Header>
    <Title level="4">Card Title</Title>
  </Card.Header>
  <Card.Body>
    <Text>Card content goes here.</Text>
  </Card.Body>
  <Card.Footer>
    <Button kind="flat">Action</Button>
  </Card.Footer>
</Card>
```

---

## 3. Create a Polymorphic Component

A `Surface` component that can render as any HTML element.

### `packages/react-components/src/components/surface/surface.tsx`

```typescript
'use client';

import type { PolyRefComponent } from '../../types/polymorphic';
import clsx from 'clsx';
import styles from './surface.module.css';

export type SurfaceProps = {
  /**
   * Elevation level (shadow depth).
   * @defaultValue 0
   */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /**
   * Whether to apply rounded corners.
   * @defaultValue true
   */
  rounded?: boolean;
};

type SurfaceComponent = PolyRefComponent<'div', SurfaceProps>;

export const Surface: SurfaceComponent = ({
  as: Component = 'div',
  className,
  elevation = 0,
  rounded = true,
  ref: forwardedRef,
  ...otherProps
}) => (
  <Component
    ref={forwardedRef}
    className={clsx(styles.Surface, className)}
    data-surface-elevation={elevation}
    data-surface-rounded={rounded}
    {...otherProps}
  />
);
```

### Usage

```tsx
// As a div (default)
<Surface elevation={2}>Content</Surface>

// As a section
<Surface as="section" elevation={1}>Section content</Surface>

// As a link
<Surface as="a" href="/page" elevation={0}>Click me</Surface>
```

---

## 4. Write a Storybook Story

Full story file with multiple variants, controls, and a custom render function.

### `packages/react-components/src/components/tag/tag.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../stack';
import { Tag } from './tag';

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  args: {
    children: 'Status',
    dimension: 'regular',
    color: 'primary',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'inline-radio' },
    },
    color: {
      options: ['primary', 'brand', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story — uses args from meta
export const Default: Story = {};

// Variant stories — override specific args
export const Small: Story = {
  args: { dimension: 'small', children: 'Small tag' },
};

// Custom render function for composition demos
export const AllColors: Story = {
  render: (args) => (
    <Stack direction="row" columnGap={8} wrap>
      <Tag {...args} color="primary">Primary</Tag>
      <Tag {...args} color="brand">Brand</Tag>
      <Tag {...args} color="positive">Positive</Tag>
      <Tag {...args} color="warning">Warning</Tag>
      <Tag {...args} color="danger">Danger</Tag>
    </Stack>
  ),
};
```

---

## 5. Use Tokens in CSS and JS

### CSS — spacing, typography, radii, duration

```css
@layer components {
  .MyComponent {
    /* Spacing */
    padding: --token(--space-16);
    margin-block-end: --token(--space-8);
    gap: --token(--space-4);

    /* Typography */
    font-size: --token(--font-size-16);
    font-family: --token(--font-family-body);
    line-height: --token(--line-height-body);

    /* Radii */
    border-radius: --token(--radius-8);

    /* Motion */
    transition: opacity --token(--duration-200) ease-out;

    /* Breakpoints — use custom media from core/utils/media.css */
    @media (--medium) {
      padding: --token(--space-24);
    }
  }
}
```

### CSS — theme variables (semantic tokens from themes)

```css
.MyComponent {
  /* Global semantic tokens */
  color: var(--global-foreground);
  background: var(--global-background);
  border-color: var(--global-border);

  /* Interactive text (links) */
  a {
    color: var(--global-interactive-text);
  }

  /* Highlight tokens (color-specific) */
  &[data-color='brand'] {
    color: var(--highlight-brand-foreground);
    background: var(--highlight-brand-background);
  }

  /* CTA tokens */
  &[data-variant='cta'] {
    color: var(--cta-foreground);
    background: var(--cta-background);
  }

  /* Dimmed tokens */
  &[data-variant='dimmed'] {
    background: var(--dimmed-background);
  }
}
```

### JS — runtime token values

```typescript
import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';

// Token-typed props
interface Props {
  gap?: TokensTypes['space'];
}

// Runtime value lookup
const gapValue = tkns.space[16]; // "0.889rem"
const brandColor = tkns.color.brand[60]; // "oklab(...)"
const breakpoint = tkns.breakpoint.medium; // { px: "...", em: "..." }
```

---

## 6. Compose Layout with Stack and Grid

### Stack — flex layout

```tsx
import { Stack } from '@lualtek/react-components';

// Vertical stack (default)
<Stack rowGap={16} hAlign="start">
  <Title level="3">Heading</Title>
  <Text>Some description</Text>
  <Button>Action</Button>
</Stack>

// Horizontal row with wrapping
<Stack direction="row" columnGap={8} wrap vAlign="center">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>CSS</Tag>
</Stack>

// Full-width children
<Stack fill rowGap={0}>
  <Input />
  <Input />
</Stack>

// With padding (TokensTypes['space'] values)
<Stack padding={24} vPadding={[16, 32]} hPadding={24}>
  <Text>Padded content</Text>
</Stack>

// As a different element
<Stack as="nav" direction="row" columnGap={16}>
  <a href="/">Home</a>
  <a href="/about">About</a>
</Stack>
```

### Grid — CSS grid layout

```tsx
import { Grid } from '@lualtek/react-components';

<Grid columns={3} gap={16}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>;
```

---

## 7. Handle Dynamic Styling with CSS Variables

When a prop value should influence styles dynamically (e.g., user-selected colors, computed sizes):

### Component

```typescript
'use client';

import { type FC, useMemo } from 'react';
import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import styles from './status-dot.module.css';

export type StatusDotProps = React.ComponentPropsWithRef<'span'> & {
  /** @defaultValue 8 */
  size?: TokensTypes['space'];
  /** @defaultValue "primary" */
  color?: TokensTypes['colors'];
};

export const StatusDot: FC<StatusDotProps> = ({
  className,
  style,
  size = 8,
  color = 'primary',
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--dot-size': tkns.space[size],
      '--dot-color': `var(--highlight-${color}-foreground)`,
    }),
    [size, color],
  );

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.StatusDot, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    />
  );
};
```

### CSS

```css
@layer components {
  .StatusDot {
    display: inline-block;
    inline-size: var(--dot-size);
    block-size: var(--dot-size);
    border-radius: --token(--radius-full);
    background: var(--dot-color);
  }
}
```

---

## 8. Add a New Icon

Icons are SVG files processed into an SVG sprite. To add one:

### Step 1: Add the SVG file

Place the SVG in the appropriate style folder:

```
packages/icons/svgs/
├── solid/
│   └── my-icon.svg      ← for solid icons
└── duotone/
    └── my-icon.svg      ← for duotone icons
```

**SVG requirements:**

- Optimized (svgo runs automatically — see `svgo.config.cjs`)
- Use `currentColor` for fill/stroke so the icon inherits text color
- Clean viewBox (typically `0 0 24 24`)

Example:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
</svg>
```

### Step 2: Rebuild the sprite

```sh
pnpm --filter @lualtek/icons run build
```

This runs `sprites.ts` which:

1. Scans all SVG files in `svgs/`
2. Generates the combined SVG sprite at `dist/sprite.svg`
3. Creates TypeScript types for all icon names at `dist/index.d.ts`
4. Updates `dist/structure.json` with available icon metadata

### Step 3: Use in a component

```tsx
import { Icon } from '@lualtek/react-components';

<Icon source="my-icon" dimension={24} />;
```

The `Icon` component references the sprite by symbol ID, which matches the filename (without `.svg`).

---

## 9. Add a Chart Component

Charts live in `packages/charts` and wrap [recharts](https://recharts.org/) primitives.

### File structure

```
packages/charts/src/components/my-chart/
├── my-chart.tsx
├── my-chart.module.css
├── my-chart.module.css.d.ts
├── my-chart.stories.tsx
└── index.ts
```

### Skeleton

```typescript
'use client';

import { type FC } from 'react';
import { ResponsiveContainer, /* recharts primitives */ } from 'recharts';
import clsx from 'clsx';
import styles from './my-chart.module.css';

export type MyChartProps = {
  data: Array<Record<string, unknown>>;
  height?: number;
  className?: string;
};

export const MyChart: FC<MyChartProps> = ({
  data,
  height = 300,
  className,
}) => (
  <div className={clsx(styles.MyChart, className)}>
    <ResponsiveContainer width="100%" height={height}>
      {/* recharts composition here */}
    </ResponsiveContainer>
  </div>
);
```

Register in `packages/charts/src/components/index.ts` and re-export from `packages/charts/src/index.ts`.
