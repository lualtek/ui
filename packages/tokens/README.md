# Lualtek Design Tokens

This repo contains all the design tokens generated from the Lualtek design language. These tokens are the foundation for our digital products.

## How to use

To use the tokens you have to install the npm package first:

```sh
npm i @lualtek/tokens
```

or

```sh
yarn add @lualtek/tokens
```

based on the platform you're working on, you can import the tokens from the relative platform folder inside **node_modules**. For example if you're working on **web**, you can import the tokens as `JSON` or `CSS` (custom-properties):

## Platforms

Currently we ship tokens only for the `web` platform, others may be added in the future.

### Inside javascript

If you want to import and use tokens inside your javascript-based project, you can import the `json` version and use it. Note that the color tokens are provided in HSL format, without the css `oklch()` notation, which you have to add each time.

```jsx
import tkns from "@lualtek/tokens/platforms/web/tokens.json";

<div style={{ color: tkns.color.blue["50"] }} />;
// To add trasparency
<div style={{ color: `oklch(from ${tkns.color.blue["50"]} l c h / 10%)` }} />;
```

#### Typescript

If your codebase is based on typescript you can import the tokens types which provide types validation for tokens when you use them inside other components. Here an example:

```jsx
import { TokensTypes } from "@lualtek/tokens/platforms/web/types";
import React from "react";

type MyComponentProps = {
  padding: TokensTypes["space"],
};
```

### Inside CSS

Inside css files the tokens are available as custom env variables (`token(--[TOKEN-NAME])`), they are then converted into the final value at build-time.

```css
@import "@lualtek/tokens/platforms/web/tokens.css";

div {
  /* Colors are defined as HSL-4 but without the oklch() notation */
  color: oklch(from token(--color-gray-80) l c h / 50%);
}
```

> **NOTE**
>
> You need to use [`postcss-import`](https://github.com/postcss/postcss-import) or [`postcss-easy-import`](https://github.com/TrySound/postcss-easy-import) to import files from node_modules
