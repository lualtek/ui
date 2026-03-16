# AGENTS.md — Lualtek UI Monorepo

> Orientation guide for AI agents working on this codebase.

## Monorepo Overview

Lualtek UI is a design system monorepo containing 7 packages. All packages are published under the `@lualtek` scope to GitHub Package Registry (restricted access).

| Package                     | Path                        | Purpose                                                                 |
| --------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `@lualtek/react-components` | `packages/react-components` | React component library (Radix-based, 56+ components)                   |
| `@lualtek/tokens`           | `packages/tokens`           | Design tokens — source of truth for colors, spacing, typography, motion |
| `@lualtek/themes`           | `packages/themes`           | Theme definitions (light/dark) layered on top of tokens                 |
| `@lualtek/config`           | `packages/config`           | Shared PostCSS configuration and `--token()` function                   |
| `@lualtek/icons`            | `packages/icons`            | SVG sprite generation and icon types                                    |
| `@lualtek/charts`           | `packages/charts`           | Chart components (bar, line) built on recharts                          |
| `tsconfig`                  | `packages/tsconfig`         | Shared TypeScript configurations                                        |

## Commands

```sh
pnpm run build          # Build all packages (Turborepo)
pnpm run build:nocache  # Build without cache
pnpm start              # Start Storybook dev server (port 6006)
pnpm run lint           # Lint with oxlint (type-aware)
pnpm run fmt            # Format with oxfmt
pnpm run fmt:check      # Check formatting without writing
pnpm run change         # Create a changeset
pnpm run release        # Publish packages via changesets
```

## Tooling

| Tool                 | Version | Config                                                                           |
| -------------------- | ------- | -------------------------------------------------------------------------------- |
| **pnpm**             | 10.30.3 | `pnpm-workspace.yaml`, `.npmrc`                                                  |
| **Turborepo**        | —       | `turbo.json`                                                                     |
| **Vite**             | —       | `vite.config.ts`                                                                 |
| **TypeScript**       | 5.9.3   | `packages/tsconfig/base.json`, `packages/tsconfig/react-library.json`            |
| **React**            | ^19.2.4 | —                                                                                |
| **oxlint**           | —       | `.oxlintrc.json` (type-aware, React plugin)                                      |
| **oxfmt**            | —       | `.oxfmtrc.json` (120-char width, 2-space indent, single quotes, trailing commas) |
| **Storybook**        | v8+     | `.storybook/` (React + Vite framework)                                           |
| **Chromatic**        | —       | `.github/workflows/chromatic.yml`                                                |
| **Style Dictionary** | —       | Token and theme generation                                                       |

## Conventions

### Commits

Conventional Commits enforced via `commitlint` + Husky `commit-msg` hook.

```
feat(react-components): add new Chip variant
fix(tokens): correct spacing scale
docs: update component API docs
```

### Versioning

- **Calendar-based**: `YYYY.M.D` (e.g., `2026.3.1`)
- **Changesets**: all `@lualtek/*` packages are version-locked together
- Access is `restricted` (private GitHub registry)

### Code Style

- **Formatting**: oxfmt — 120-char lines, 2-space indent, single quotes, trailing commas
- **Linting**: oxlint — type-aware with React plugin, strict TypeScript rules
- **Pre-commit** (lint-staged): oxlint + oxfmt on staged files

### Testing

Not yet implemented. The test command is a placeholder.

## Token Flow Architecture

```
tokens/src/configs/*.json          (Design token source files)
        │
        ▼  Style Dictionary + custom transforms (px→rem, hex→oklab)
tokens/platforms/web/
  ├── tokens.css                   (CSS custom properties)
  ├── tokens.json                  (Nested JSON for runtime JS)
  └── tokens-flat.json             (Flat JSON for PostCSS)
        │
        ├──────────────────────────────────────────────┐
        ▼                                              ▼
themes/src/themes/{name}/*.json    config/src/postcss/config-object.ts
  (light/dark overrides)             (--token() function resolver)
        │                                              │
        ▼  Style Dictionary                            ▼
themes/platforms/web/{name}.css    Component CSS files
  (light-dark() CSS function)        --token(--space-8) → resolved value
        │                                              │
        └──────────────┬───────────────────────────────┘
                       ▼
              react-components/src/core.css
              (imports tokens + themes, defines @layer order)
                       │
                       ▼
              Component .module.css files
              (consume CSS vars: --global-foreground, --highlight-*, etc.)
```

### CSS Layer Order

```css
@layer core, utilities, plain-components, components, overrides, themes;
```

## Package Dependency Graph

```
react-components
  ├── tokens     (CSS vars + JSON values + TypeScript types)
  ├── themes     (theme CSS)
  ├── config     (PostCSS processing)
  └── icons      (SVG sprite + icon types)

themes
  └── tokens     (references base token values)

config
  └── tokens     (reads tokens-flat.json for --token() resolution)

charts
  └── tokens     (type definitions)
```

## Key Path Aliases (tsconfig)

```
@/components/*  → packages/react-components/src/*
@/charts/*      → packages/charts/src/*
@lualtek/tokens → packages/tokens
@lualtek/icons  → packages/icons
```

## CI/CD

- **CI** (`ci.yml`): Runs on PRs to `main`/`next`
- **Release** (`release.yml`): Runs on push to `main`/`next`, builds + publishes
- **Chromatic** (`chromatic.yml`): Visual regression testing on CSS/TSX changes

## Additional Documentation

### For library contributors (working on this repo)

- `docs/components.md` — Component anatomy and conventions
- `docs/patterns.md` — Recommended design patterns
- `docs/examples.md` — Full code examples and walkthroughs
- `docs/anti-patterns.md` — What to avoid
